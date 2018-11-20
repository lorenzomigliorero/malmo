const inquirer = require('inquirer');
const commandLineUsage = require('command-line-usage');
const chalk = require('chalk');
const { labels } = require('@malmo/cli-utils/log');

module.exports = ({
  starterKit,
  name,
  description,
}) => inquirer.prompt([
  {
    name: 'confirm',
    type: 'confirm',
    message: () => `${commandLineUsage([
      {
        header: chalk.blue(labels['prompt.recap']),
        content: [
          {
            name: 'Starter kit',
            summary: starterKit,
          },
          {
            name: 'Name',
            summary: name,
          },
          description ? {
            name: 'Description',
            summary: description,
          } : undefined,
        ].filter(Boolean),
      },
    ])}\n${labels['prompt.confirm']}`.trim(),
  },
]);
