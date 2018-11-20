const inquirer = require('inquirer');
const { getRemotePackageInfo } = require('npm-node-utils');
const { labels } = require('@malmo/cli-utils/log');

let remoteStarterKitVersion;

module.exports = () => inquirer.prompt([
  {
    name: 'name',
    type: 'input',
    validate: value => Boolean(value),
    message: labels['prompt.name'],
  },
  {
    name: 'description',
    type: 'input',
    message: labels['prompt.description'],
  },
  {
    name: 'npmClient',
    type: 'list',
    choices: ['yarn', 'npm'],
    message: labels['prompt.npmClient'],
  },
  {
    name: 'starterKit',
    type: 'list',
    pageSize: 15,
    choices: ({ npmClient }) => require('./get-starter-kits')({ npmClient }),
    message: labels['prompt.starterKit'],
  },
  {
    name: 'needsUpdate',
    type: 'confirm',
    when: ({
      starterKit: {
        name,
        version,
      },
      npmClient: client,
    }) => {
      try {
        remoteStarterKitVersion = getRemotePackageInfo({
          client,
          name,
          key: 'version',
        });
      } catch (error) {
        return false;
      }
      return remoteStarterKitVersion !== version;
    },
    message: ({ starterKit: { name } }) => labels['prompt.needsUpdate']({
      name,
      version: remoteStarterKitVersion,
    }),
  },
]);
