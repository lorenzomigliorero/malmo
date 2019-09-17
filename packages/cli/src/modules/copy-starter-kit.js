const { copy } = require('fs-extra');
const { getGlobalPackagePath } = require('npm-node-utils');

module.exports = ({
  npmClient,
  starterKit,
}) => {
  const starterKitSrc = getGlobalPackagePath({
    client: npmClient,
    name: starterKit,
  });
  const { PWD } = process.env;
  return copy(starterKitSrc, PWD, { dereference: true });
};
