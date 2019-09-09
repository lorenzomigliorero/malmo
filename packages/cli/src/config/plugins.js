module.exports = () => {
  const {
    projectType,
    htmlIndex,
  } = require('../constants');

  return {
    miniCssExtractPlugin: {
      filename: process.env.NODE_ENV === 'development' || projectType === 'library'
        ? '[name].css'
        : '[name].[contenthash:5].css',
    },
    uglifyJsPlugin: {
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: {
          warnings: false,
          conditionals: true,
          reduce_vars: false,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          join_vars: true,
          if_return: true,
        },
        output: { comments: false },
      },
    },
    htmlPlugin: { template: htmlIndex },
  };
};
