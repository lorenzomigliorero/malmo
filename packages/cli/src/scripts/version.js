const mainPackage = require('../../package.json');

module.exports = () => {
  console.log(mainPackage.version);
};
