const rimraf = require('rimraf');
const { dist } = require('../constants');

module.exports = () => new Promise((resolve) => {
  rimraf(dist, resolve);
});
