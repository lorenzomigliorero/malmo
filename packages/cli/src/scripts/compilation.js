const express = require('express');
const ora = require('ora');
const webpack = require('webpack');
const { labels } = require('@malmo/cli-utils/log');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const {
  multiCompilerErrorHandler,
  compilationLog,
} = require('@malmo/cli-utils/log');

module.exports = async (config) => {
  const {
    clean,
    projectType,
    root,
  } = require('../constants');

  require('./help')({ minimal: true });

  const spinner = ora();

  if (clean) {
    spinner.start(labels['queue.clean']);
    await require('./clean')();
    spinner.succeed();
  }

  return new Promise((resolve) => {
    /* Create multicompiler instance */
    const multiCompiler = webpack(config);

    /* Extract clientCompiler */
    const clientCompiler = multiCompiler.compilers.find(c => c.name === 'client');

    /* Define router to pass later to resolve */
    let router;

    /* Init progress log */
    spinner.start(labels['queue.startMulticompilerBuilds']());

    new ProgressPlugin((percentage) => {
      if (percentage < 1) {
        spinner.start(labels['queue.startMulticompilerBuilds'](percentage));
      }
    }).apply(multiCompiler);
    /* End progress log */

    if (process.env.NODE_ENV === 'development') {
      router = express.Router();

      router.use([
        /* Dev middleware */
        webpackDevMiddleware(multiCompiler, {
          logLevel: 'silent',
          publicPath: config[0].output.publicPath,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
          },
        }),
        /* Hot middleware */
        webpackHotMiddleware(clientCompiler, { log: false }),
        /* Hot server middleware */
        projectType === 'ssr' ? webpackHotServerMiddleware(multiCompiler) : undefined,
      ].filter(Boolean));

      /* Reset console on HMR */
      multiCompiler.hooks.watchRun.tap('watchRun', () => {
        process.stdout.write('\x1Bc\x1B[3J');
        require('./help')({ minimal: true });
        spinner.start(labels['queue.startMulticompilerBuilds']());
      });

      /* Error handling */
      multiCompiler.hooks.done.tap('done', (multiStats) => {
        multiStats.stats.forEach(stats => multiCompilerErrorHandler(null, stats));
      });
    } else {
      if (projectType === 'ssr') {
        /* Transfer clientStats to server bundle */
        multiCompiler.compilers[1].hooks.beforeRun.tapAsync('beforeRun', (compiler, cb) => {
          multiCompiler.compilers[0].hooks.done.tap('done', (stats) => {
            new webpack.DefinePlugin({
              clientStats: JSON.stringify(stats.toJson({
                depth: false,
                modules: false,
              })),
            }).apply(compiler);
            cb();
          });
        });
      }
      multiCompiler.run(multiCompilerErrorHandler);
    }

    /* Log assets from stats end resolve promise */
    multiCompiler.hooks.done.tap('done', (multiStats) => {
      multiStats.stats.forEach((stats) => {
        spinner.succeed(labels['queue.completeBuild'](stats));
      });

      compilationLog({
        root,
        multiStats,
      });

      resolve({
        router,
        multiStats,
      });
    });
  });
};
