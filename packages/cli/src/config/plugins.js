module.exports = () => {
  const { projectType } = require('../constants');

  return {
    miniCssExtractPlugin: {
      filename: process.env.NODE_ENV === 'development' || projectType === 'library'
        ? '[name].css'
        : '[name].[contenthash:5].css',
    },
  };
};
