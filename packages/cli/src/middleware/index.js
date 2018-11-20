const CookieParser = require('cookie-parser');
const nofavicon = require('express-no-favicons');

const preServerRender = (app) => {
  app
    .use(nofavicon())
    .use(CookieParser());
  return app;
};

const postServerRender = (app) => {
	app.use((err, req, res, next) => { // eslint-disable-line
    if (err) {
      res.status(err.status || 500).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : '',
      });
    } else {
      next();
    }
  });
  return app;
};

module.exports = {
  preServerRender,
  postServerRender,
};
