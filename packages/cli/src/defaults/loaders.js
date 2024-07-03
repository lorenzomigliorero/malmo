module.exports = ({
  styles,
  malmoCliNodeModules,
}) => ({
  cssHot: { reloadAll: true },
  css: {
    importLoaders: 1,
    localsConvention: 'camelCase',
    onlyLocals: !!process.env.SERVER,
    sourceMap: process.env.NODE_ENV === 'development',
    modules: { localIdentName: process.env.NODE_ENV === 'development' ? '[name]__[local]' : '[hash:base64:5]' },
  },
  cssNodeModules: {},
  scss: {
    includePaths: [
      styles,
      malmoCliNodeModules,
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
      require('@babel/plugin-proposal-optional-chaining').default,
      require('@babel/plugin-proposal-nullish-coalescing-operator').default,
      [require('@babel/plugin-transform-runtime').default],
    ],
  },
});
