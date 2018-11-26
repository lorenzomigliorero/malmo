module.exports = {
  plugins: ['import'],
  settings: {
    'import/core-modules': [
      'express',
      'html-webpack-plugin',
      'mini-css-extract-plugin',
      'uglifyjs-webpack-plugin',
      'webpack',
      'webpack-merge',
    ],
  },
  rules: { 'import/no-unresolved': 2 },
};
