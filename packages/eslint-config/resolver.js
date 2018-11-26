const fs = require('fs');
const path = require('path');
const resolve = require('resolve');

module.exports.interfaceVersion = 2;

module.exports.resolve = (source, file, config) => {
  const { baseDir } = config;
  const commonPath = fs.existsSync(path.resolve(baseDir, 'src', 'common'))
    ? path.resolve(baseDir, 'src', 'common')
    : path.resolve(baseDir, 'src');

  if (resolve.isCore(source)) return { found: true, path: null };
  try {
    return {
      found: true,
      path: resolve.sync(source.replace('@', commonPath), {
        extensions: [
          '.js',
          '.jsx',
          '.scss',
        ],
      }),
    };
  } catch (err) {
    return { found: false };
  }
};
