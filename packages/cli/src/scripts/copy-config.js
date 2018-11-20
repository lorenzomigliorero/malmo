const path = require('path');
const { copySync } = require('fs-extra');

module.exports = () => {
  const { configFileName } = require('../constants/config');
  const fromPath = path.resolve(__dirname, '..', 'template', 'config.js');
  const toPath = `${process.env.PWD}/${configFileName}`;
  copySync(fromPath, toPath);
};
