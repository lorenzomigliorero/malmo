module.exports = () => {
  const configuration = require('../modules/configuration')();
  console.log(JSON.stringify(configuration, null, 4));
};
