const { address } = require('ip');
const { existsSync } = require('fs');
const { setAlias } = require('node-require-alias');
const { path: rootPath } = require('app-root-path');
const {
  getArgs,
  catchEmitterErrors,
  setFreePortEnv,
} = require('@malmo/cli-utils');

module.exports = async () => {
  const validate = require('./validate');

  const { aliasDependencies } = require('../constants/config');

  process.on('unhandledRejection', (error) => {
    console.error(error);
  });

  catchEmitterErrors();

  await setFreePortEnv();

  /* Map cli modules to project */
  setAlias(aliasDependencies.reduce((obj, key) => {
    const malmoCliNodeModulesPackagePath = `${rootPath}/node_modules/@malmo/cli/node_modules/${key}`;
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

  const { standard, _all: { command }, _unknown } = global.ARGS;
  const option = Object.keys(standard)[0];
  let module = command || option;

  if (command || option || _unknown) {
    validate();
  } else {
    module = 'help';
  }

  require(`../${module === 'help' || module === 'version' ? 'scripts' : 'commands'}/${module}`)();
};
