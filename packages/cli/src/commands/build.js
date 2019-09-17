module.exports = async () => {
  process.env.NODE_ENV = 'production';

  const configuration = require('../modules/configuration')();
  const { projectType } = configuration;

  const defaults = [require('../defaults/client')(configuration)];
  if (projectType === 'ssr') {
    defaults.push(require('../defaults/server')(configuration));
  }

  await require('../modules/compilation')(defaults, configuration);
};
