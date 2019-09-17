const rimraf = require('rimraf');

module.exports = path => new Promise((resolve) => {
  rimraf(path, resolve);
});
