/* eslint-disable no-nested-ternary */
const { address } = require('ip');
const { existsSync } = require('fs');
const { setAlias } = require('node-require-alias');
const { getArgs, catchEmitterErrors, getFreePort, getAppRoot } = require('@malmo/cli-utils');

module.exports = async () => {
  const validate = require('./validate');

  const { aliasDependencies } = require('../constants');

  process.on('unhandledRejection', (error) => {
    console.error(error);
  });

  catchEmitterErrors();

  const rootPath = getAppRoot();

  /* Map cli modules to project */
  setAlias(aliasDependencies.reduce((obj, key) => {
    const malmoCliNodeModulesPackagePath = `${rootPath}/node_modules/malmo/node_modules/${key}`;
    const globalNodeModulesPackagePath = `${rootPath}/node_modules/${key}`;
    if (existsSync(malmoCliNodeModulesPackagePath)) {
      obj[key] = malmoCliNodeModulesPackagePath; // eslint-disable-line no-param-reassign
    } else if (existsSync(globalNodeModulesPackagePath)) {
      obj[key] = globalNodeModulesPackagePath; // eslint-disable-line no-param-reassign
    }
    return obj;
  }, {}));

  global.ARGS = getArgs();
  process.env.PWD = process.env.PWD || process.cwd();
  process.env.IP = process.env.IP || address();
  process.env.PORT = process.env.PORT || await getFreePort();

  const { single, _all: { command, watch }, _unknown } = global.ARGS;
  const option = Object.keys(single)[0];

  if (command || option || _unknown) {
    validate();
  }

  const module = command === 'dev' && watch
    ? '../options/watch'
    : command
      ? `../commands/${command}`
      : option
        ? `../options/${option}`
        : '../options/help';

  require(module)();
};
