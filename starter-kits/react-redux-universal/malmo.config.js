module.exports = () => ({
  apiBaseUrl: `http://${process.env.IP}:${process.env.PORT}/api`,
  env: {
    development: {},
    production: {},
  },
});
