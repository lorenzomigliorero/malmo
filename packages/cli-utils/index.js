const path = require('path');
const { EventEmitter } = require('events');
const {
  getGlobalPackages,
  getRemotePackages,
} = require('npm-node-utils');
const opener = require('opener');
const { execSync } = require('child_process');
const fs = require('fs');
const commandLineArgs = require('command-line-args');
const merge = require('webpack-merge');
const portFinder = require('portfinder');
const { errorLog } = require('./log');

const emitter = new EventEmitter();

const filterStarterKitName = name => name.includes('malmo') && name.includes('starter-kit');

const getGlobalStarterKits = ({
  client,
  extended,
}) => getGlobalPackages({
  client,
  extended,
  filter: filterStarterKitName,
});

const getRemoteStarterKits = async () => {
  const query = 'malmo-starter-kit';
  const packages = await getRemotePackages({
    text: query,
    size: 250,
  });
  return packages.filter(({ name }) => filterStarterKitName(name));
};

const openBrowser = ({ url }) => {
  if (process.platform === 'darwin') {
    try {
      execSync('ps cax | grep "Google Chrome"');
      execSync(`osascript open-chrome.applescript "${encodeURI(url)}"`, {
        cwd: __dirname,
        stdio: 'ignore',
      });
      return true;
    } catch (err) {
      // Ignore errors.
    }
  } else if (process.platform === 'win32') {
    opener(url);
  }
  return true;
};

const findFreePort = (base) => {
  if (base) portFinder.basePort = base;
  return portFinder.getPortPromise();
};

const setFreePortEnv = async () => {
  process.env.PORT = process.env.PORT || await findFreePort();
};

const getMergedWebpackConfig = ({
  config = {},
  webpackConfigPath,
  customConstants = {},
}) => {
  if (fs.existsSync(webpackConfigPath)) {
    let webpackConfig = require(webpackConfigPath);
    if (typeof webpackConfig === 'function') {
      webpackConfig = webpackConfig({ ...customConstants });
      if (typeof (webpackConfig) === 'object') {
        return merge(config, webpackConfig);
      }
    }
  }
  return config;
};

const getMergedLoadersConfig = ({
  config,
  loaderConfigPath,
  customConstants = {},
}) => {
  if (fs.existsSync(loaderConfigPath)) {
    let loaderConfig = require(loaderConfigPath);
    if (typeof loaderConfig === 'function') {
      loaderConfig = loaderConfig(customConstants);
      if (typeof (loaderConfig) === 'object') {
        return merge(config(customConstants), loaderConfig);
      }
    }
  }
  return config(customConstants);
};

const getArgs = () => commandLineArgs([
  {
    name: 'command',
    type: String,
    defaultOption: true,
  },
  {
    name: 'help',
    alias: 'h',
    group: 'standard',
    type: Boolean,
  },
  {
    name: 'env',
    alias: 'e',
    type: String,
  },
  {
    name: 'version',
    alias: 'v',
    group: 'standard',
    type: Boolean,
  },
], { stopAtFirstUnknown: true });

const checkIfTargetIsLibrary = ({
  webpackConfigPath,
  customConstants,
}) => {
  const config = getMergedWebpackConfig({
    webpackConfigPath,
    ...customConstants,
  });
  return !!(config.output && config.output.library);
};

const catchEmitterErrors = () => {
  emitter.on('error', (err, { exit = true } = {}) => {
    errorLog({ content: err.message });
    if (exit) process.exit();
  });
};

const getEmitter = () => emitter;

const getProjectType = ({
  src,
  webpackConfigPath,
  customConstants,
}) => {
  if (fs.existsSync(path.resolve(src, 'server'))) {
    return 'ssr';
  }
  if (checkIfTargetIsLibrary({
    webpackConfigPath,
    customConstants,
  })) {
    return 'library';
  }
  return 'client';
};

const sortObject = (o) => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {}); // eslint-disable-line

const readFilesSync = (dir, files = []) => {
  fs.readdirSync(dir)
    .forEach((filename) => {
      const { name } = path.parse(filename);
      const { ext } = path.parse(filename);
      const filepath = path.resolve(dir, filename);
      const stat = fs.statSync(filepath);
      const isFile = stat.isFile();

      if (isFile) files.push({ filepath, name, ext, stat });
    });

  return files;
};

const getIncludeArrayFromLoaderOption = loader => [
  typeof (loader.include) === 'string' ? loader.include : false,
  ...(Array.isArray(loader.include) ? loader.include : []),
].filter(Boolean);

module.exports = {
  catchEmitterErrors,
  checkIfTargetIsLibrary,
  findFreePort,
  getArgs,
  getEmitter,
  getGlobalStarterKits,
  getIncludeArrayFromLoaderOption,
  getMergedLoadersConfig,
  getMergedWebpackConfig,
  getProjectType,
  getRemoteStarterKits,
  openBrowser,
  readFilesSync,
  setFreePortEnv,
  sortObject,
};
