module.exports = ({ SERVER, NODE_ENV }) => {
  const {
    styles,
    malmoCliNodeModules,
    NODE_MODULES,
  } = require('../constants');

  return {
    cssHot: { reloadAll: true },
    css: {
      modules: true,
      importLoaders: 1,
      camelCase: true,
      localIdentName: NODE_ENV === 'development' ? '[name]__[local]' : '[hash:base64:5]',
      sourceMap: NODE_ENV === 'development',
      minimize: NODE_ENV === 'production',
    },
    postcss: {
      sourceMap: NODE_ENV !== 'production',
      options: {},
    },
    scss: {
      includePaths: [
        styles,
        malmoCliNodeModules,
        NODE_MODULES,
      ],
      sourceMap: NODE_ENV === 'development',
    },
    file: {
      name: NODE_ENV === 'development' ? '[name].[ext]' : '[name].[hash:5].[ext]',
      outputPath: 'assets',
      emitFile: !SERVER,
    },
    js: {
      babelrc: false,
      presets: [
        [require('@babel/preset-env').default, { modules: false }],
      ],
      plugins: [
        [require('@babel/plugin-proposal-decorators').default, { legacy: true }],
        require('@babel/plugin-proposal-class-properties').default,
        require('@babel/plugin-proposal-object-rest-spread').default,
        require('@babel/plugin-proposal-optional-chaining').default,
        require('@babel/plugin-transform-async-to-generator').default,
        [require('@babel/plugin-transform-runtime').default],
      ],
    },
  };
};
