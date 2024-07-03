module.exports = async () => {
  process.env.NODE_ENV = 'production';

  const configuration = require('../modules/configuration')();
  const { projectType } = configuration;

  const defaults = [require('../defaults/client')(configuration)];
  if (projectType === 'ssr') {
    defaults.push(require('../defaults/server')(configuration));
  }

  try {
    await require('../modules/compilation')(defaults, configuration);
  } catch(e) {
    console.error(e)
    process.exit(1)
  }
};
