const path = require('path');
const { omit } = require('lodash');
const url = require('url');
const fs = require('fs');
const { getMergedConfig, getProjectType, sortObject, getAppRoot, getWorkSpacesRoot } = require('@malmo/cli-utils');
const configFileNames = require('../constants');

module.exports = () => {
  const { IP, NODE_ENV, PWD, PORT } = process.env;

  const { ARGS } = global;

  const worksSpacesRoot = getWorkSpacesRoot(PWD);

  const constants = {
    appRootNodeModules: `${getAppRoot()}/node_modules`,
    workSpacesNodeModules: worksSpacesRoot
      ? `${worksSpacesRoot}/node_modules`
      : undefined,
    browserListConfigPath: fs.existsSync(`${PWD}/.browserslistrc`)
      ? `${PWD}/.browserslistrc`
      : undefined,
    malmoCliRoot: path.resolve(__dirname, '../../'),
    malmoCliNodeModules: path.resolve(__dirname, '../../node_modules'),
    emptyModule: path.resolve(__dirname, '../shims/module.js'),
    modernizr: fs.existsSync(`${PWD}/.modernizrrc.js`)
      ? path.resolve(PWD, '.modernizrrc.js')
      : undefined,
    path: '',
    pwd: PWD,
    pwdNodeModules: path.resolve(PWD, 'node_modules'),
    src: 'src',
  };

  const overwritableConstants = {
    bootstrapExpressApp: NODE_ENV === 'production',
    clean: true,
    dist: 'dist',
    publicPath: '',
    port: PORT,
    root: '',
    staticFolder: '',
    https: {},
  };

  /* Resolve configuration fileNames */
  Object.assign(constants, {
    configPath: path.resolve(PWD, configFileNames.configFileName),
    webpackConfigPath: fs.existsSync(path.resolve(PWD, configFileNames.configWebpackFileName))
      ? path.resolve(PWD, configFileNames.configWebpackFileName)
      : null,
    loadersConfigPath: fs.existsSync(path.resolve(PWD, configFileNames.configLoadersFileName))
      ? path.resolve(PWD, configFileNames.configLoadersFileName)
      : null,
    pluginsConfigPath: fs.existsSync(path.resolve(PWD, configFileNames.configPluginsFileName))
      ? path.resolve(PWD, configFileNames.configPluginsFileName)
      : null,
    expressConfigPath: fs.existsSync(path.resolve(PWD, configFileNames.configExpressFileName))
      ? path.resolve(PWD, configFileNames.configExpressFileName)
      : constants.emptyModule,
  });

  /* Require createConfig from pwd */
  const config = getMergedConfig({ configPath: constants.configPath });

  /* Extract env object based on args */
  const envFromArgs = ARGS._all.env; // eslint-disable-line
  const configEnv = envFromArgs ? (config.env || {})[envFromArgs] : {};

  /* Overwrite default configuration with env configuration */
  const configFromEnv = Object.assign(omit(config, 'env'), configEnv);

  /* Collect custom constants  */
  const customConstants = sortObject(configFromEnv);

  /* Merge overwritableConstants with env configuration */
  Object.assign(overwritableConstants, configFromEnv, { customConstants });

  /* Merge overwritableConstants with constants */
  Object.assign(constants, overwritableConstants);

  /* Require webpack configuration */
  Object.assign(constants, {
    getWebpackConfig: baseConfig => getMergedConfig({
      baseConfig,
      configPath: constants.webpackConfigPath,
      params: customConstants,
    }),
  });

  /* Detect project type (client, ssr, library) */
  constants.projectType = getProjectType({
    src: constants.src,
    webpackConfig: constants.getWebpackConfig(),
  });

  if (
    fs.existsSync(constants.https.key)
    && fs.existsSync(constants.https.cert)
  ) {
    process.env.HTTPS = true;
  }

  /* End constants merge, init normalization */
  if (constants.projectType === 'ssr') {
    Object.assign(constants, {
      assets: path.resolve(PWD, constants.src, 'common', 'assets'),
      client: path.resolve(PWD, constants.src, 'client'),
      common: path.resolve(PWD, constants.src, 'common'),
      path: constants.path || 'public',
      // Ensure that public path starts end ends with '/'
      publicPath: !constants.publicPath.startsWith('http')
        ? path.posix.join('/', constants.publicPath, constants.staticFolder, '/')
        : url.resolve(constants.publicPath, constants.staticFolder, '/'),
      serverEntry: path.resolve(__dirname, '../entry/server.js'),
      serverRender: path.resolve(PWD, constants.src, 'server'),
      styles: path.resolve(PWD, constants.src, 'common', 'styles'),
    });
  } else {
    Object.assign(constants, {
      assets: path.resolve(PWD, constants.src, 'assets'),
      client: path.resolve(PWD, constants.src),
      common: path.resolve(PWD, constants.src),
      // If exists, ensure that public path ends with '/'
      publicPath: constants.publicPath
        ? path.posix.join(constants.publicPath, '/')
        : constants.publicPath,
      styles: path.resolve(PWD, constants.src, 'styles'),
    });
  }

  Object.assign(constants, {
    dist: path.resolve(PWD, constants.dist),
    /* absolute path, tells webpack where to create bundle */
    path: path.join(PWD, constants.dist, constants.path, constants.staticFolder),
    src: path.resolve(PWD, constants.src),
    /* expressStaticFolder tells Express where to server static assets */
    expressStaticFolder: path.posix.join(constants.path),
    htmlIndex: fs.existsSync(path.resolve(constants.src, 'index.html'))
      ? path.resolve(constants.src, 'index.html')
      : undefined,
    root: constants.root || `${process.env.HTTPS ? 'https' : 'http'}://${IP}:${constants.port}`,
    /* publicPath will be prepended on every required assets, example: /{publicPath}/main.js */
    publicPath: NODE_ENV === 'development' ? `//${IP}:${constants.port}/` : constants.publicPath,
  });

  /* Require other configurations */
  Object.assign(constants, {
    getPluginsConfig: () => getMergedConfig({
      baseConfig: require('../defaults/plugins')(constants),
      configPath: constants.pluginsConfigPath,
      params: customConstants,
    }),
    getLoadersConfig: () => getMergedConfig({
      baseConfig: require('../defaults/loaders')(constants),
      configPath: constants.loadersConfigPath,
      params: customConstants,
    }),
  });

  if (constants.browserListConfigPath) {
    process.env.BROWSERSLIST_CONFIG = constants.browserListConfigPath;
  }

  process.env.PORT = constants.port;

  return sortObject(constants);
};
