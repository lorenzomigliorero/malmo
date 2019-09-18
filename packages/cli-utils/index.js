const watch = require('node-watch');
const path = require('path');
const { EventEmitter } = require('events');
const {
  getGlobalPackages,
  getRemotePackages,
} = require('npm-node-utils');
const opener = require('opener');
const {
  execSync,
  exec,
} = require('child_process');
const fs = require('fs');
const commandLineArgs = require('command-line-args');
const merge = require('webpack-merge');
const portFinder = require('portfinder');
const clearModule = require('clear-module');
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

const openBrowser = (url) => {
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

const getFreePort = (base) => {
  if (base) portFinder.basePort = base;
  return portFinder.getPortPromise();
};

const importFresh = (modulePath) => {
  clearModule(modulePath);
  return require(modulePath);
};

const getMergedConfig = ({
  baseConfig = {},
  configPath,
  params = {},
}) => {
  if (fs.existsSync(configPath)) {
    let config = importFresh(configPath);
    if (typeof config === 'function') {
      config = config(params);
      if (typeof (config) === 'object') {
        return merge(baseConfig, config);
      }
    }
  }
  return baseConfig;
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
    group: 'single',
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
    group: 'single',
    type: Boolean,
  },
  {
    name: 'watch',
    alias: 'w',
    type: Boolean,
  },
], { stopAtFirstUnknown: true });

const checkIfTargetIsLibrary = config => !!(config.output && config.output.library);

const catchEmitterErrors = () => {
  emitter.on('error', (err, { exit = true } = {}) => {
    errorLog({ content: err.message });
    if (exit) process.exit();
  });
};

const getProjectType = ({
  src,
  webpackConfig,
}) => {
  if (fs.existsSync(path.resolve(src, 'server'))) {
    return 'ssr';
  }
  if (checkIfTargetIsLibrary(webpackConfig)) {
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

const execSheelCommand = ({
  command,
  args = [],
  sync = true,
  rejectOnError = false,
}) => {
  const commandWithArgs = `${command} ${args.reduce((a, b) => `${a} ${b}`, '')}`;
  const stdio = ['pipe', 'pipe', 'ignore'];
  if (sync) {
    try {
      const out = execSync(commandWithArgs, { stdio });
      return out.toString().trim();
    } catch (err) {
      if (err) return Error(err.message);
    }
  } else {
    return new Promise((resolve, reject) => {
      exec(commandWithArgs, { stdio }, (err, stdout) => {
        if (err) (rejectOnError ? reject : resolve)(Error(err.message.trim()));
        resolve(stdout.trim());
      });
    });
  }
  return false;
};

const promiseSerial = ({
  promises,
  onStart = false,
  onResolve = false,
}) => promises
  .reduce((promiseChain, currentTask, index) => promiseChain
    .then((chainResults) => {
      if (typeof onStart === 'function') onStart(index);
      return currentTask.then((currentResult) => {
        if (typeof onResolve === 'function') onResolve(currentResult, index);
        return [...chainResults, currentResult];
      });
    }),
  Promise.resolve([]));

const watchFiles = async ({
  files,
  callback,
}) => {
  let reset;

  watch(files, { recursive: false }, async () => {
    if (typeof reset === 'function') {
      reset();
    }
    reset = await callback();
  });

  reset = await callback();
};

module.exports = {
  catchEmitterErrors,
  checkIfTargetIsLibrary,
  execSheelCommand,
  getArgs,
  emitter,
  getFreePort,
  getGlobalStarterKits,
  getIncludeArrayFromLoaderOption,
  getMergedConfig,
  getProjectType,
  getRemoteStarterKits,
  openBrowser,
  promiseSerial,
  readFilesSync,
  sortObject,
  importFresh,
  watchFiles,
};
