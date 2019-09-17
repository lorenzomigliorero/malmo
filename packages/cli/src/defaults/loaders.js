module.exports = ({
  styles,
  malmoCliNodeModules,
  NODE_MODULES,
}) => ({
  cssHot: { reloadAll: true },
  css: {
    modules: true,
    importLoaders: 1,
    camelCase: true,
    localIdentName: process.env.NODE_ENV === 'development' ? '[name]__[local]' : '[hash:base64:5]',
    sourceMap: process.env.NODE_ENV === 'development',
    minimize: process.env.NODE_ENV === 'production',
  },
  cssNodeModules: { minimize: process.env.NODE_ENV === 'production' },
  postcss: {
    sourceMap: process.env.NODE_ENV !== 'production',
    options: {},
  },
  postcssNodeModules: { options: {} },
  scss: {
    includePaths: [
      styles,
      malmoCliNodeModules,
      NODE_MODULES,
    ],
    sourceMap: process.env.NODE_ENV === 'development',
  },
  file: {
    name: process.env.NODE_ENV === 'development' ? '[name].[ext]' : '[name].[hash:5].[ext]',
    outputPath: 'assets',
    emitFile: !process.env.SERVER,
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
});
