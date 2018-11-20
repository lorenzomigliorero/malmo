const commandLineUsage = require('command-line-usage');
const chalk = require('chalk');
const {
  labels,
  ansiHeaderLog,
} = require('@malmo/cli-utils/log');
const { configFileName } = require('../constants/config');
const commands = require('../constants/commands');
const mainPackage = require('../../package.json');

module.exports = ({
  custom,
  minimal = false,
  appendToDescription = '',
} = {}) => {
  const sections = [
    {
      content: chalk.blue(ansiHeaderLog({ version: mainPackage.version })),
      raw: true,
    },
    {
      content: `
        ${mainPackage.description} ${appendToDescription}
      `.trim(),
    },
  ];

  if (!minimal) {
    sections.push(
      {
        header: chalk.blue(labels['command.header']),
        content: commands.map(command => ({
          name: chalk.bold(command),
          summary: labels[`command.${command}`],
        })),
      },
      {
        header: chalk.blue(labels['options.header']),
        optionList: [
          {
            name: 'help',
            alias: 'h',
            description: labels['options.help'],
          },
          {
            name: 'version',
            alias: 'v',
            description: labels['options.version'],
          },
          {
            name: 'env',
            typeLabel: '[key]',
            description: labels['options.env']({ configFileName }),
          },
        ],
      },
      {
        header: chalk.blue(labels['examples.header']),
        content: [
          {
            name: chalk.bold('malmo init'),
            summary: labels['examples.init'],
          },
          {
            name: chalk.bold('malmo dev --env development'),
            summary: labels['examples.dev'],
          },
          {
            name: chalk.bold('malmo build --env production'),
            summary: labels['examples.build'],
          },
        ],
      },
    );
  }

  if (custom) sections.splice(custom.position || 1, 0, custom);

  const usage = commandLineUsage(sections);
  console.log(usage);
};
