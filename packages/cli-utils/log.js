const chalk = require('chalk');
const { startCase } = require('lodash');
const formatMessages = require('webpack-format-messages');
const Table = require('cli-table2');

const log = ({ content }) => chalk.bold.blue(content);

const capitalize = str => str.replace(/^\w/, c => c.toUpperCase());

const tableLog = ({ head, values }) => {
  const table = new Table({
    head,
    style: {
      head: [],
      border: [],
    },
  });
  table.push(...values);
  return table.toString();
};

const webpackAssetsLog = (stats) => {
  let { assets } = stats.toJson();

  assets = assets.filter(asset => !asset.name.includes('hot-update')).map(({
    name,
    size,
    chunks,
  }) => ({
    name,
    size,
    chunks,
  }));

  return tableLog({
    head: Object.keys(assets[0]).map(key => chalk.bold.blue(startCase(key))),
    values: assets.map(({
      name,
      size,
      chunks,
    }) => [
      chalk.bold.yellow(name),
      chalk.bold.green.italic(`${(size / 1000).toFixed(2)} kb`),
      chunks.reduce((a, b) => `${a} ${b}`, ''),
    ]),
  });
};

const labels = {
  'command.build': 'Build your application',
  'command.config': 'Print current configuration',
  'command.dev': 'Launch dev server',
  'command.header': 'Available commands',
  'command.init': 'Initialize configuration wizard',
  'error.command': ({ command }) => `${chalk.italic(command)} command not recognized. Type ${chalk.italic('malmo')} and see ${chalk.italic('Available commands/options')} section`,
  'error.configuration': ({ configFileName }) => `Missing or Invalid configuration.\nCheck ${chalk.italic(configFileName)} on your project root or run ${chalk.italic('malmo init')} to restart`,
  'error.configurationAlreadyExist': () => `Configuration already created, launch ${chalk.italic('malmo dev')} to init development`,
  'error.invalidEnv': ({ configFileName, env }) => `Env ${chalk.italic(env)} is missing. Check ${chalk.italic(configFileName)}`,
  'error.missingGlobalStarterKit': () => `Missing starter kit.\nInstall globally a starter kit then relaunch ${chalk.italic('malmo')}.`,
  'examples.build': `Build your application, use ${chalk.blue('env.production')} configuration`,
  'examples.dev': `Launch dev server, use ${chalk.blue('env.development')} configuration`,
  'examples.header': 'Example usage',
  'examples.init': 'Initialize configuration wizard',
  'init.install': 'Install starter kit globally',
  'init.copy': 'Copy starter kit files',
  'init.start': 'Insert a few data before starting:',
  'init.command': ({ command, error }) => `Launch ${chalk.italic[error ? 'red' : 'blue'](command)}${error ? ` ${error}` : ''}`,
  'init.update': 'Update starter kit globally',
  'options.env': ({ configFileName }) => `Use ${chalk.blue('env[key]')} configuration from ${chalk.blue(configFileName)}`,
  'options.header': 'Available options',
  'options.help': 'Print this usage guide',
  'options.version': 'Print package version',
  'prompt.confirm': 'Confirm?',
  'prompt.description': 'Project description',
  'prompt.name': 'Project name',
  'prompt.needsUpdate': ({ name, version }) => `${name} is outdated.\nUpdate to latest version (${version})?`.trim(),
  'prompt.npmClient': 'Select your default npm client',
  'prompt.recap': 'Your input:',
  'prompt.starterKit': 'Select a starter kit',
  'queue.clean': log({ content: 'Clean dist folder' }),
  'queue.completeBuild': stats => log({ content: `${capitalize(stats.compilation.name)} compilation finish in ${chalk.green.italic(`${(stats.endTime - stats.startTime) / 1000}s`)}` }),
  'queue.percentage': percentage => log({ content: percentage ? `${(percentage * 100).toFixed(2)}%` : '' }),
  'queue.startMulticompilerBuilds': (percentage = 0) => log({ content: `Building some stuff ${(percentage * 100).toFixed(2)}%` }),
  'success.build': () => chalk.green.bold('Build completed successfully!'),
  'success.devServer': ({ root }) => chalk.green.bold(`Check your browser on ${chalk.blue.underline.italic(root)}`),
  'success.init': () => chalk.green.bold(`We are finished!\nLaunch ${chalk.blue.italic('malmo dev')} to init development.\n\n${chalk.bold.yellow('Happy coding!')}`),
  separator: '',
};

const compilationLog = ({
  root,
  errorLength,
  multiStats,
}) => {
  console.log(labels.separator);
  multiStats.stats.forEach(stats => console.log(webpackAssetsLog(stats)));
  console.log(labels.separator);

  if (!errorLength) {
    console.log(labels[`success.${process.env.NODE_ENV === 'development' ? 'devServer' : 'build'}`]({ root }));
    console.log(labels.separator);
  }
};

const errorLog = ({ content }) => {
  console.log(chalk.bold.red(`${chalk.bold.red('😠  Ops!')} ${content}`));
};

const multiCompilerErrorHandler = (err, stats) => {
  const messages = formatMessages(stats);

  if (messages.errors.length) {
    messages.errors.forEach(e => console.log(`\n${chalk.red(e)}`));
  }

  if (messages.warnings.length) {
    messages.warnings.forEach(w => console.log(`\n${chalk.red(w)}`));
  }

  return messages.errors.length;
};

const ansiHeaderLog = ({ version }) => {
  const rowLength = 16;
  const versionLength = version.length;
  const count = Math.floor((rowLength - versionLength) / 2);
  const rowString = [...Array(count).keys()].reduce(i => `${`${i}─`}`, '');

  return `
   ┌─────────────────┐
   │ ┌┬┐┌─┐┬  ┌┬┐┌─┐ │
   │ │││├─┤│  ││││ │ │
   │ ┴ ┴┴ ┴┴─┘┴ ┴└─┘ │
   └${versionLength % 2 === 0 ? rowString.slice(0, -1) : rowString} ${version} ${rowString}┘
  `;
};

module.exports = {
  ansiHeaderLog,
  capitalize,
  compilationLog,
  errorLog,
  labels,
  multiCompilerErrorHandler,
  webpackAssetsLog,
};
