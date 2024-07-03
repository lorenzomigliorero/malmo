module.exports = () => ({
  js: {
    presets: ['@babel/react'],
    include: require.resolve('@malmo/welcome-react'),
  },
});
