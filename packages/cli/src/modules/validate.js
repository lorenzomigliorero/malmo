const fs = require('fs');
const { getEmitter } = require('@malmo/cli-utils');
const { labels } = require('@malmo/cli-utils/log');
const { configFileName } = require('../constants');
const commands = require('./commands');

module.exports = () => {
  const { _all: { command }, env, _unknown, single } = global.ARGS;
  const existsValidOption = Object.keys(single).length > 0;

  /* Invalid command/option */
  if (!existsValidOption && (_unknown || (!commands.includes(command)))) {
    getEmitter().emit('error', new Error(labels['error.command']({ command: `${_unknown || command}` })));
  }

  if (!existsValidOption && command === 'init') {
    /* Configuration already exists */
    if (
      fs.existsSync(`${process.env.PWD}/${configFileName}`)
    ) {
      getEmitter().emit('error', new Error(labels['error.configurationAlreadyExist']()));
    }
  }

  if (!existsValidOption && command !== 'init') {
    /* Missing configuration */
    if (
      !fs.existsSync(`${process.env.PWD}/${configFileName}`)
    ) {
      getEmitter().emit('error', new Error(labels['error.configuration']({ configFileName })));
    }

    /* Invalid Configuration */
    try {
      require(`${process.env.PWD}/${configFileName}`);
    } catch (e) {
      getEmitter().emit('error', new Error(labels['error.configuration']({ configFileName })));
    }
  }
  if (!existsValidOption && env) {
    const config = require(`${process.env.PWD}/${configFileName}`)();
    /* Invalid env option */
    if (
      !config.env || (config.env && !config.env[env])
    ) {
      getEmitter().emit('error', new Error(labels['error.invalidEnv']({ env })));
    }
  }
};
