```
┌─────────────────┐
│ ┌┬┐┌─┐┬  ┌┬┐┌─┐ │
│ │││├─┤│  ││││ │ │
│ ┴ ┴┴ ┴┴─┘┴ ┴└─┘ │
└─────────────────┘
```

A cli interface to build Javascript applications with zero configuration.

- [Installation](#installation)
- [Available commands](#commands)
- [Available options](#options)
- [malmo.config.js](#malmo.config.js)
    - [The environments](#environments)
    - [The global `CONSTANTS` object](#constants)
- [malmo.loaders-config.js](#malmo.loaders-config.js)
- [malmo.plugins-config.js](#malmo.plugins-config.js)
- [malmo.webpack-config.js](#malmo.webpack-config.js)
- [malmo.express-config.js](#malmo.express-config.js)
- [Configuration format](#configuration-format)
- [Merge strategy](#merge-strategy)
- [Environment variables](#environment-variables)
- [Shared node packages](#shared-node-packages)

## <a name="installation"></a>Installation

- With *yarn*: `yarn global add malmo`
- With *npm*: `npm install -g malmo`

## <a name="commands"></a>Available commands

- `malmo init` Initialize configuration wizard. Remote and locale packages that contain `malmo` and `starter-kit` in their names will be listed.
- `malmo dev` Launch dev server
- `malmo build` Build your application
- `malmo config` Print current configuration

## <a name="options"></a>Available options

- `-h, --help` Print the usage guide
- `-v, --version` Print package version
- `-w, --watch` Restart compilation on configuration files changes
- `--env [key]` Use `env[key]` configuration from `malmo.config.js`- 

## <a name="malmo.config.js"></a>malmo.config.js

Use this file for overwrite or extend all the settings used by the malmo cli:

| Parameter | Description | Type | Required | Default | Available in the global CONSTANTS object
|---|---|---|---|---|---|
| *bootstrapExpressApp* | Invoke Express.listen method | boolean |  | `NODE_ENV === 'production'` | true
| *clean* | Clean `dist` folder before launch dev server | boolean |  | `true` | false
| *dist* | Name of the `dist` folder | string |  | `dist` | false
| *publicPath* | Webpack `output.publicPath` setting | string |  | `` | true
| *port* | Express application port | number |  | first available port | true
| *root* | The project browser address, opened after `malmo dev` | number |  | `{PROTOCOL}://{IP}:{PORT}` | true
| *staticFolder* | The public folder where all the bundled files will be placed | string |  | `` |  false
| *https.key* | Key certificate path | string |  | `` | false
| *https.cert* | Cert certificate path | string |  | `` | false

### <a name="environments"></a> Environment

Each setting is overwritable with the `env` key:

```js
module.exports = {
    bootstrapExpressApp: true,
    foo: 100, // custom constant, see above
    env: {
        staging: {
            bootstrapExpressApp: false,
            foo: 200,
        }
    }
}
```

### <a name="constants"></a> Global `CONSTANTS` object

Thanks to `webpack.DefinePlugin`, those settings are propagated from `malmo` to each webpack entries in the global `CONSTANTS` object:

`malmo dev`
```js
/* global CONSTANTS */
console.log(CONSTANTS.foo) // 100
```

`malmo dev --env=staging`
```js
/* global CONSTANTS */
console.log(CONSTANTS.foo) // 200
```

## <a name="malmo.loaders-config.js"></a>malmo.loaders-config.js

Use this configuration for overwrite or extend all the settings used by the default malmo webpack loaders:

| Key | Options |
|---|---|
| cssHot | see https://github.com/shepherdwind/css-hot-loader for all the available options
| css | see https://webpack.js.org/loaders/css-loader for all the available options
| cssNodeModules | `css-loader` settings applied to the `node_modules` folder
| scss | see https://webpack.js.org/loaders/sass-loader for all the available options
| file | see https://webpack.js.org/loaders/file-loader for all the available options
| js | see https://github.com/babel/babel-loader for all the available options

If you need to add same external folders to the babel transpile, use the `js.include` option:

```js
const path = require('path');

module.exports = {
    js: {
        include: path.resolve(__dirname, 'node_modules', 'my-module')
    }
}
```

## <a name="malmo.plugins-config.js"></a>malmo.plugins-config.js

Use this configuration for overwrite or extend all the settings used by the default malmo webpack plugins:

| Key | Options |
|---|---|
| miniCssExtractPlugin | see https://webpack.js.org/plugins/mini-css-extract-plugin for all the available options
| uglifyJsPlugin | see https://www.npmjs.com/package/uglifyjs-webpack-plugin for all the available options
| htmlWebpackPlugin | see https://github.com/jantimon/html-webpack-plugin#options for all the available options

```js
module.exports = {
    htmlWebpackPlugin: {
        title: "Project Title"
    }
}
```

## <a name="malmo.webpack-config.js"></a>malmo.webpack-config.js

Use this configuration for extend the webpack configuration:

```js
module.exports = {
    module: {
      rules: [
        {
          test: /\.(glsl|frag|vert)$/,
          use: [
              'raw-loader',
              'glslify-loader',
            ],
        },
      ],
    },
}
```

## <a name="malmo.express-config.js"></a>malmo.express-config.js

Use this configuration for extend the express application used in ssr mode:

```js
const cors = require('cors');

module.exports = (app, options) => {
  app.use(cors());
  return app;
};
```

## <a name="configuration-format"></a> Configuration format

Each configuration can be written as a simple js object, or as a function that returns an object.
The object will be merged with the defaults thanks to the [webpack-merge](https://github.com/survivejs/webpack-merge) package.
If you use a function, all the settings are passed as arguments:

- *malmo.loaders-config.js*
- *malmo.plugins-config.js*
- *malmo.webpack-config.js*

```js
module.exports = ({
    foo,
    port,
    others...
}) => ({
    
})
```

- *malmo.express-config.js*

```js
module.exports = (app, {
    foo,
    port,
    others...
}) => ({
    
})
```

### <a name="merge-strategy"></a> Merge strategy

For customize the `webpack-merge` strategy, export a named variable called `strategy`:

```js
module.exports = { ... };

module.exports.strategy = { css: 'replace' };
```

## <a name="env-variables"></a> Environment variables

This are the environment variables available in all the configuration files:

| Key | Description |
|---|---|
| `process.env.SERVER` | `true` if the configuration is used by the `server.js` entry
| `process.env.NODE_ENV` | `development` or `production`, based on the launched command
| `process.env.PORT` | the node process port

## <a name="shared-node-packages"></a> Shared node packages

In all the configuration files, these modules are linked from the `malmo` folder, so it's not necessary to install them:

- express
- modernizr
- html-webpack-plugin
- mini-css-extract-plugin
- uglifyjs-webpack-plugin
- webpack
- webpack-merge
