# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.1.0...malmo@2.1.1) (2019-07-15)


### Bug Fixes

* **publicPath:** fix publicPath normalization with absolute url ([649c3d6](https://github.com/lorenzomigliorero/malmo/commit/649c3d6))
* **webpack-hot-middleware:** add path for __webpack_hmr scripts ([6c2d520](https://github.com/lorenzomigliorero/malmo/commit/6c2d520))





# [2.1.0](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.0.0...malmo@2.1.0) (2019-01-25)


### Features

* **express-config:** add customConstants as arguments in expressConfig function ([9ce64df](https://github.com/lorenzomigliorero/malmo/commit/9ce64df))





# 2.0.0 (2019-01-09)


### Bug Fixes

(https://github.com/lorenzomigliorero/malmo/commit/85099f9))
* **staticFolder:** remove staticFolder from publicPath on client starter kit ([4da50c1]


### Features

* **pkg-name:** rename package to malmo ([ba6fc65](https://github.com/lorenzomigliorero/malmo/commit/ba6fc65))
* **styles-loaders:** add different css, postCss loaders options for node_modules folder ([b6781e4](https://github.com/lorenzomigliorero/malmo/commit/b6781e4))


### BREAKING CHANGES

* **pkg-name:** Rename package from @malmo/cli to malmo





## [1.4.6](https://github.com/lorenzomigliorero/malmo/compare/@malmo/cli@1.4.5...@malmo/cli@1.4.6) (2019-01-07)


### Bug Fixes

* **staticFolder:** fix staticFolder parameter in webpack output configuration ([85099f9](https://github.com/lorenzomigliorero/malmo/commit/85099f9))





## [1.4.5](https://github.com/lorenzomigliorero/malmo/compare/@malmo/cli@1.4.4...@malmo/cli@1.4.5) (2018-12-21)


### Bug Fixes

* **root:** add root as overwritable constants ([5e012e5](https://github.com/lorenzomigliorero/malmo/commit/5e012e5))





## [1.4.4](https://github.com/lorenzomigliorero/malmo/compare/@malmo/cli@1.4.3...@malmo/cli@1.4.4) (2018-12-21)


### Bug Fixes

* **process.env.PORT:** optimize process.env.PORT for production environment ([50a04db](https://github.com/lorenzomigliorero/malmo/commit/50a04db))





## [1.4.3](https://github.com/lorenzomigliorero/malmo/compare/@malmo/cli@1.4.2...@malmo/cli@1.4.3) (2018-12-19)


### Bug Fixes

* **windows:** path resolution ([52fc429](https://github.com/lorenzomigliorero/malmo/commit/52fc429))





## [1.4.2](https://github.com/lorenzomigliorero/malmo/compare/@malmo/cli@1.4.1...@malmo/cli@1.4.2) (2018-12-14)


### Bug Fixes

* **splitChunks:** remove vendors splitChunks on library project ([e53dd2d](https://github.com/lorenzomigliorero/malmo/commit/e53dd2d))





## [1.4.1](https://github.com/lorenzomigliorero/malmo/compare/@malmo/cli@1.4.0...@malmo/cli@1.4.1) (2018-12-07)


### Bug Fixes

* **command:** add default configuration export ([f68ce4c](https://github.com/lorenzomigliorero/malmo/commit/f68ce4c))
* **modernizr:** add to aliases dependencies ([677d2da](https://github.com/lorenzomigliorero/malmo/commit/677d2da))





# [1.4.0](https://github.com/lorenzomigliorero/malmo/compare/@malmo/cli@1.3.0...@malmo/cli@1.4.0) (2018-12-06)


### Features

* **commands:** add pre/post install commands ([5de07fc](https://github.com/lorenzomigliorero/malmo/commit/5de07fc))





# [1.3.0](https://github.com/lorenzomigliorero/malmo/compare/@malmo/cli@1.2.1...@malmo/cli@1.3.0) (2018-12-05)


### Features

* **loaders:** add include param in loader config object ([16ece8a](https://github.com/lorenzomigliorero/malmo/commit/16ece8a))





## [1.2.1](https://github.com/lorenzomigliorero/malmo/compare/@malmo/cli@1.2.0...@malmo/cli@1.2.1) (2018-11-29)

**Note:** Version bump only for package @malmo/cli





# [1.2.0](https://github.com/lorenzomigliorero/malmo/compare/@malmo/cli@1.1.2...@malmo/cli@1.2.0) (2018-11-29)

**Note:** Version bump only for package @malmo/cli





## [1.1.2](https://github.com/lorenzomigliorero/malmo/compare/@malmo/cli@1.1.1...@malmo/cli@1.1.2) (2018-11-27)


### Bug Fixes

* **loaders:** replace old params with process.env variables in loaders.js ([f7a3293](https://github.com/lorenzomigliorero/malmo/commit/f7a3293))





## [1.1.1](https://github.com/lorenzomigliorero/malmo/compare/@malmo/cli@1.1.0...@malmo/cli@1.1.1) (2018-11-27)


### Bug Fixes

* **babel-loader:** add babel-loader to node_modules/[@malmo](https://github.com/malmo) ([29193c6](https://github.com/lorenzomigliorero/malmo/commit/29193c6))





# [1.1.0](https://github.com/lorenzomigliorero/malmo/compare/@malmo/cli@1.0.0...@malmo/cli@1.1.0) (2018-11-26)


### Bug Fixes

* **babel-core:** remove babel-core from aliased dependencies ([1c3e90b](https://github.com/lorenzomigliorero/malmo/commit/1c3e90b))
* **constants:** import constants from global define to remove any link with starter kit folder struc ([2575a7f](https://github.com/lorenzomigliorero/malmo/commit/2575a7f))


### Features

* **css:** add postcss-loader to css webpack rule ([3c7c2d4](https://github.com/lorenzomigliorero/malmo/commit/3c7c2d4))





# 1.0.0 (2018-11-21)

**Note:** Version bump only for package @malmo/cli
