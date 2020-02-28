module.exports = {
  extends: ['airbnb'],
  env: { jest: true },
  rules: {
    'no-console': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': [
      2,
      { devDependencies: true },
    ],
    'import/no-unresolved': [
      2,
      {
        ignore: [
          'express-config',
          'server-render',
          '@/constants',
        ],
      }],
    'global-require': 0,
    'object-curly-newline': [
      2, { multiline: true }],
  },
};
