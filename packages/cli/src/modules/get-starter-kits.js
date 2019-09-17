const inquirer = require('inquirer');
const {
  getEmitter,
  getRemoteStarterKits,
  getGlobalStarterKits,
} = require('@malmo/cli-utils');
const { labels } = require('@malmo/cli-utils/log');

const getInquirerChoice = ({
  name,
  version,
  description,
}) => ({
  name: `
${name}@${version}
  ${name.includes('@malmo/') ? '★  ' : ''}${description}
        `.trim(),
  value: {
    name,
    version,
  },
  short: name,
});

module.exports = async ({ npmClient } = {}) => {
  let remote = await getRemoteStarterKits().catch(() => {}) || [];
  const local = await getGlobalStarterKits({
    client: npmClient,
    extended: true,
  });
  if (remote.length + local.length === 0) {
    getEmitter().emit('error', new Error(labels['error.missingGlobalStarterKit']()));
  }
  // Exclude localPackages from remote list
  const localNames = local.map(({ name }) => name);
  remote = remote.filter(({ name: remoteName }) => !localNames.includes(remoteName));

  // Start list with a Separator
  let starterKits = [new inquirer.Separator()];

  // Create list alternating a package with a separator
  starterKits = starterKits.concat(
    [...local, ...remote]
      .map(l => getInquirerChoice(l))
      .reduce((a, b) => a.concat([b, new inquirer.Separator()]), []),
  );

  // Remove last separator
  starterKits.splice(-1);
  return starterKits;
};
