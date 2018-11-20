const { execSync } = require('child_process');

const config = execSync('malmo config').toString();
const {
  malmoCliRoot,
  common,
} = JSON.parse(config);

const { dependencies } = require(`${malmoCliRoot}/package.json`);

module.exports = {
  settings: {
    'import/resolver': {
      [require.resolve('eslint-import-resolver-alias')]: {
        map: [
          ['@', common],
        ],
        extensions: [
          '.js',
          '.jsx',
          '.scss',
        ],
      },
    },
    'import/core-modules': Object.keys(dependencies),
  },
};
