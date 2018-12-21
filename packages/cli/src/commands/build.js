module.exports = async () => {
  process.env.NODE_ENV = 'production';

  const { projectType } = require('../constants');

  await require('../scripts/compilation')([
    require('../config/client')(),
    projectType === 'ssr' ? require('../config/server')() : undefined,
  ].filter(Boolean));
};
