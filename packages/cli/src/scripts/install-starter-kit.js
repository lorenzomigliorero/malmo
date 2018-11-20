const { exec } = require('child_process');
const { copySync } = require('fs-extra');
const { getGlobalPackagePath } = require('npm-node-utils');

module.exports = ({
  npmClient,
  starterKit,
}) => new Promise((resolve) => {
  const starterKitSrc = getGlobalPackagePath({
    client: npmClient,
    name: starterKit,
  });
  const { PWD } = process.env;
  copySync(starterKitSrc, PWD, { dereference: true });

  const command = npmClient === 'yarn' ? 'yarn install' : 'npm install';
  exec(command, (err) => {
    if (err) throw new Error(err);
    resolve();
  });
});
