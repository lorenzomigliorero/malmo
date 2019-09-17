const ora = require('ora');
const { checkIfPackageIsGloballyInstalled } = require('npm-node-utils');
const { labels } = require('@malmo/cli-utils/log');

module.exports = async () => {
  require('../modules/help')({
    minimal: true,
    appendToDescription: labels['init.start'],
  });

  const {
    description,
    name,
    needsUpdate,
    npmClient,
    starterKit: { name: starterKit },
  } = await require('../modules/prompt')();

  console.log(labels.separator);

  const { confirm } = await require('../modules/confirm')({
    starterKit,
    name,
    description,
  });

  if (!confirm) process.exit();

  console.log(labels.separator);

  const spinner = ora();
  require('../modules/copy-config')();

  const isStarterKitGloballyInstalled = checkIfPackageIsGloballyInstalled({
    client: npmClient,
    name: starterKit,
  });

  if (
    needsUpdate
    || !isStarterKitGloballyInstalled
  ) {
    spinner.start(labels[needsUpdate ? 'init.update' : 'init.install']);
    await require('../modules/update-starter-kit')({
      npmClient,
      starterKit,
    });
  }

  spinner.start(labels['init.copy']);

  await require('../modules/copy-starter-kit')({
    npmClient,
    starterKit,
  });

  spinner.succeed(labels['init.copy']);

  await require('../modules/install-starter-kit')({
    npmClient,
    onStartCommand: command => spinner.start(labels['init.command']({ command })),
    onResolveCommand: ({
      status,
      error,
      command,
    }) => spinner[status === 'success' ? 'succeed' : 'fail'](labels['init.command']({
      command,
      error,
    })),
  });

  require('../modules/update-package')({
    name,
    description,
  });

  spinner.stop();

  console.log(labels.separator);
  console.log(labels['success.init']());
};
