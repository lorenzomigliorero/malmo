module.exports = {
  plugins: ['import'],
  settings: {
    'import/core-modules': [
      'express',
      'html-webpack-plugin',
      'mini-css-extract-plugin',
      'uglifyjs-webpack-plugin',
      'modernizr',
      'webpack',
      'webpack-merge',
    ],
  },
  rules: { 'import/no-unresolved': 2 },
};
