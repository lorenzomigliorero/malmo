const {
  execSheelCommand,
  promiseSerial,
} = require('@malmo/cli-utils');
const { configFileName } = require('../constants/config');

module.exports = ({
  npmClient,
  install = [npmClient === 'yarn' ? 'yarn install' : 'npm install'],
  onStartCommand,
  onResolveCommand,
} = {}) => {
  const {
    command: {
      preinstall = [],
      postinstall = [],
    } = {},
  } = require(`${process.env.PWD}/${configFileName}`)();

  const commands = [
    ...preinstall,
    ...install,
    ...postinstall,
  ];

  const promisedCommands = commands.map(command => execSheelCommand({
    command,
    sync: false,
  }));

  return promiseSerial({
    promises: promisedCommands,
    onStart: (index) => {
      if (onStartCommand) onStartCommand(commands[index]);
    },
    onResolve: (output, index) => {
      const status = output instanceof Error ? 'error' : 'success';
      if (onResolveCommand) {
        onResolveCommand({
          status,
          error: status === 'error' ? output : undefined,
          command: commands[index],
        });
      }
    },
  });
};
