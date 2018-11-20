const path = require('path');
const { omit } = require('lodash');
const fs = require('fs');
const { path: appRootPath } = require('app-root-path');
const {
  getProjectType,
  sortObject,
} = require('@malmo/cli-utils');
const config = require('./config');

const {
  IP,
  NODE_ENV,
  PORT,
  PWD,
} = process.env;

const { ARGS } = global;

const constants = {
  appRootNodeModules: `${appRootPath}/node_modules`,
  browserListConfigPath: fs.existsSync(`${PWD}/.browserslistrc`) ? `${PWD}/.browserslistrc` : undefined,
  malmoCliRoot: path.resolve(__dirname, '../../'),
  malmoCliNodeModules: path.resolve(__dirname, '../../node_modules'),
  emptyModule: path.resolve(__dirname, '../shims/module'),
  modernizr: fs.existsSync(`${PWD}/.modernizrrc.js`) ? path.resolve(PWD, '.modernizrrc.js') : undefined,
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
  root: `http://${IP}:${PORT}`,
  staticFolder: '',
};

/* Merge with configuration files name */
Object.assign(constants, config);

/* Create absolute configuration path */
Object.assign(constants, {
  configPath: path.resolve(PWD, constants.configFileName),
  expressConfigPath: fs.existsSync(path.resolve(PWD, constants.configExpressFileName))
    ? path.resolve(PWD, constants.configExpressFileName)
    : constants.emptyModule,
  loaderConfigPath: path.resolve(PWD, constants.configLoadersFileName),
  webpackConfigPath: path.resolve(PWD, constants.configWebpackFileName),
});

/* Require createConfig from pwd */
const createAppConfig = require(`${PWD}/${constants.configFileName}`)();

/* Extract env object based on args */
const envFromArgs = ARGS._all.env; // eslint-disable-line
const createAppConfigEnv = envFromArgs ? (createAppConfig.env || {})[envFromArgs] : {};

/* Overwrite default configuration with env configuration */
const configFromEnv = Object.assign(omit(createAppConfig, 'env'), createAppConfigEnv);

/* Collect custom constants, substracting keys from constants object  */
let customConstants = omit(configFromEnv, Object.keys(configFromEnv)
  .filter(key => Object.keys(overwritableConstants).includes(key)));

customConstants = sortObject(customConstants);

/* Merge overwritableConstants with env configuration */
Object.assign(overwritableConstants, configFromEnv, { customConstants });

/* Merge overwritableConstants with constants */
Object.assign(constants, overwritableConstants);

/* Detect project type (client, ssr, library) */
constants.projectType = getProjectType({
  src: constants.src,
  webpackConfigPath: constants.webpackConfigPath,
  customConstants: constants.customConstants,
});

/* End constants merge, init normalization */
if (constants.projectType === 'ssr') {
  Object.assign(constants, {
    assets: path.resolve(PWD, constants.src, 'common', 'assets'),
    client: path.resolve(PWD, constants.src, 'client'),
    common: path.resolve(PWD, constants.src, 'common'),
    path: constants.path || 'public',
    // Ensure that public path starts end ends with '/'
    publicPath: path.posix.join('/', constants.publicPath, '/'),
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
    publicPath: constants.publicPath ? path.posix.join(constants.publicPath, '/') : constants.publicPath,
    styles: path.resolve(PWD, constants.src, 'styles'),
  });
}

Object.assign(constants, {
  dist: path.resolve(PWD, constants.dist),
  path: path.join(PWD, constants.dist, constants.path),
  src: path.resolve(PWD, constants.src),
  staticFolder: constants.staticFolder || constants.path,
  htmlIndex: fs.existsSync(path.resolve(constants.src, 'index.html')) ? path.resolve(constants.src, 'index.html') : undefined,
  publicPath: NODE_ENV === 'development' ? `http://${IP}:${PORT}/` : constants.publicPath,
});

if (constants.browserListConfigPath) {
  process.env.BROWSERSLIST_CONFIG = constants.browserListConfigPath;
}

module.exports = sortObject(constants);
