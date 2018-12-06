const ora = require('ora');
const { checkIfPackageIsGloballyInstalled } = require('npm-node-utils');
const { labels } = require('@malmo/cli-utils/log');

module.exports = async () => {
  require('../scripts/help')({
    minimal: true,
    appendToDescription: labels['init.start'],
  });

  const {
    description,
    name,
    needsUpdate,
    npmClient,
    starterKit: { name: starterKit },
  } = await require('../scripts/prompt')();

  console.log(labels.separator);

  const { confirm } = await require('../scripts/confirm')({
    starterKit,
    name,
    description,
  });

  if (!confirm) process.exit();

  console.log(labels.separator);

  const spinner = ora();
  require('../scripts/copy-config')();

  const isStarterKitGloballyInstalled = checkIfPackageIsGloballyInstalled({
    client: npmClient,
    name: starterKit,
  });

  if (
    needsUpdate
    || !isStarterKitGloballyInstalled
  ) {
    spinner.start(labels[needsUpdate ? 'init.update' : 'init.install']);
    await require('../scripts/update-starter-kit')({
      npmClient,
      starterKit,
    });
  }

  spinner.start(labels['init.copy']);

  await require('../scripts/copy-starter-kit')({
    npmClient,
    starterKit,
  });

  spinner.succeed(labels['init.copy']);

  await require('../scripts/install-starter-kit')({
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

  require('../scripts/update-package')({
    name,
    description,
  });

  spinner.stop();

  console.log(labels.separator);
  console.log(labels['success.init']());
};
