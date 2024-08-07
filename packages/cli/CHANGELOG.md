# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.1.0](https://github.com/lorenzomigliorero/malmo/compare/malmo@3.0.1...malmo@3.1.0) (2024-07-03)


### Features

* **errors:** process exit 1 in case of errors ([5a7787f](https://github.com/lorenzomigliorero/malmo/commit/5a7787f0bf213282a9c0b2cad28f2ac68903dac7))
* **sass:** use sass for node 16 support ([fa5782e](https://github.com/lorenzomigliorero/malmo/commit/fa5782e6488eb9dc27f89bbce16418090c3943f6))





## [3.0.1](https://github.com/lorenzomigliorero/malmo/compare/malmo@3.0.0...malmo@3.0.1) (2020-07-15)


### Bug Fixes

* **css-loader:** remove deprecated options ([a26f3f1](https://github.com/lorenzomigliorero/malmo/commit/a26f3f1b1b70560f47c71031015ee7347700d492))





# [3.0.0](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.7.1...malmo@3.0.0) (2020-07-15)


### Features

* **deps:** update css-loader, postcss-loader and mini-css-extract-plugin ([f6992df](https://github.com/lorenzomigliorero/malmo/commit/f6992dfb409b899ead5c02e3132b925532aba5f7))


### BREAKING CHANGES

* **deps:** composes import syntax





## [2.7.1](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.7.0...malmo@2.7.1) (2020-04-21)


### Bug Fixes

* **publicPath:** remove protocol ([44f3bb4](https://github.com/lorenzomigliorero/malmo/commit/44f3bb4b6b6b851f6fbfd1561bd32bde5a6be2e3))





# [2.7.0](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.6.1...malmo@2.7.0) (2020-04-16)


### Features

* **https:** add https option ([1b5fdbd](https://github.com/lorenzomigliorero/malmo/commit/1b5fdbd1a1fd4395de99a952301d95addc4980bc))





## [2.6.1](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.6.0...malmo@2.6.1) (2020-04-02)


### Bug Fixes

* **express:** replace getMergedConfig with importFresh ([461733a](https://github.com/lorenzomigliorero/malmo/commit/461733aefb5d8606a2757eeb7074b11a070e3b64))





# [2.6.0](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.5.3...malmo@2.6.0) (2020-04-02)


### Bug Fixes

* **resolve-loader:** fix modules folder order ([2c2ae1f](https://github.com/lorenzomigliorero/malmo/commit/2c2ae1f2a986c06aa2942aa7d37a28c6d20dfe56))


### Features

* **postcss:** conditionally add postcss loader ([78dde05](https://github.com/lorenzomigliorero/malmo/commit/78dde0550f97e7fb89b51a95c122d4230ea2065f))





## [2.5.3](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.5.2...malmo@2.5.3) (2020-03-05)


### Bug Fixes

* **loader:** fix resolve-loader folders order ([50d6046](https://github.com/lorenzomigliorero/malmo/commit/50d604643ae27aed75d3f4e08da50285d21abd78))





## [2.5.2](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.5.1...malmo@2.5.2) (2020-02-28)


### Bug Fixes

* **deps:** updated deps ([6849d17](https://github.com/lorenzomigliorero/malmo/commit/6849d176481c3d97254f56acfdbcdf5d5c4c3424))





## [2.5.1](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.5.0...malmo@2.5.1) (2020-02-28)


### Bug Fixes

* **rootpath:** replace rootpath from app-root-path module ([eec25a6](https://github.com/lorenzomigliorero/malmo/commit/eec25a6))
* **workspaces:** fix workspaces and app-root configuration path ([d259d3a](https://github.com/lorenzomigliorero/malmo/commit/d259d3a))





# [2.5.0](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.4.1...malmo@2.5.0) (2020-02-27)


### Features

* **workspaces:** add workspaces node-modules in resolve and resolve-loader configurations ([4106ef7](https://github.com/lorenzomigliorero/malmo/commit/4106ef7))





## [2.4.1](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.4.0...malmo@2.4.1) (2019-11-28)


### Bug Fixes

* **mini-css-extract-plugin:** update for support support ignoreOrder flag" ([e0a77f0](https://github.com/lorenzomigliorero/malmo/commit/e0a77f0))





# [2.4.0](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.3.3...malmo@2.4.0) (2019-10-02)


### Bug Fixes

* **babel:** remove unuseless babel plugin, already included in babel preset env ([b06cf20](https://github.com/lorenzomigliorero/malmo/commit/b06cf20))


### Features

* **watch:** add .browserlistrc as watched file ([bb32445](https://github.com/lorenzomigliorero/malmo/commit/bb32445))





## [2.3.3](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.3.2...malmo@2.3.3) (2019-09-18)


### Bug Fixes

* **configuration:** add missing parameters when create plugins configuration object ([a74c841](https://github.com/lorenzomigliorero/malmo/commit/a74c841))





## [2.3.2](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.3.1...malmo@2.3.2) (2019-09-18)


### Bug Fixes

* **init:** fix wrong help module path in init command ([be81098](https://github.com/lorenzomigliorero/malmo/commit/be81098))





## [2.3.1](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.3.0...malmo@2.3.1) (2019-09-17)


### Bug Fixes

* **watch:** add extension to emptyModule path to prevent a missing module error from node-watch ([71829a3](https://github.com/lorenzomigliorero/malmo/commit/71829a3))





# [2.3.0](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.2.1...malmo@2.3.0) (2019-09-17)


### Features

* **watch:** reload compilation on configuration files changes ([5565948](https://github.com/lorenzomigliorero/malmo/commit/5565948))





## [2.2.1](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.2.0...malmo@2.2.1) (2019-09-12)


### Bug Fixes

* **module resolution:** replace [@malmo](https://github.com/malmo)/cli with malmo in setAlias method ([b7d19dc](https://github.com/lorenzomigliorero/malmo/commit/b7d19dc))





# [2.2.0](https://github.com/lorenzomigliorero/malmo/compare/malmo@2.1.1...malmo@2.2.0) (2019-09-09)


### Features

* **Plugins:** add plugins configuration ([3784a6b](https://github.com/lorenzomigliorero/malmo/commit/3784a6b))





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
