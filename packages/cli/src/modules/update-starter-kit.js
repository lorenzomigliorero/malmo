const { exec } = require('child_process');

module.exports = ({
  npmClient,
  starterKit,
}) => new Promise((resolve, reject) => {
  const command = npmClient === 'yarn' ? `yarn global add ${starterKit}@latest` : `npm install ${starterKit}@latest -g`;
  exec(command, (err) => {
    if (err) reject(err);
    resolve();
  });
});
