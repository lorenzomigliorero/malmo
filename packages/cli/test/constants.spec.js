jest.mock(`${process.env.PWD}/malmo.config.js`, () => () => global.malmoConfig, { virtual: true });

beforeEach(() => {
  jest.resetModules();
  delete global.ARGS.env;
});

describe('Normalize public path', () => {
  [
    'development',
    'production',
  ].forEach((NODE_ENV) => {
    [
      {},
      { publicPath: '' },
      { publicPath: 'foo' },
      { publicPath: 'foo/bar' },
      { publicPath: 'foo/bar/' },
      { publicPath: 'foo//bar/' },
    ].forEach((config) => {
      if (NODE_ENV === 'development') {
        it('Starts with protocol', () => {
          global.malmoConfig = config;
          process.env.NODE_ENV = NODE_ENV;
          const { publicPath } = require('../src/modules/configuration')();
          expect(publicPath).toEqual(expect.stringMatching(/^[a-z0-9]+:\/\//));
        });
      }
      if (NODE_ENV === 'production') {
        it('Not contains //', () => {
          global.malmoConfig = config;
          process.env.NODE_ENV = NODE_ENV;
          const { publicPath } = require('../src/modules/configuration')();
          expect(publicPath).toEqual(expect.not.stringContaining('//'));
        });
      }
      it('Assert that ends with /', () => {
        global.malmoConfig = config;
        const { publicPath } = require('../src/modules/configuration')();
        if (publicPath) {
          expect(publicPath.endsWith('/')).toBeTruthy();
        }
      });
    });
  });
});

describe('Object merging', () => {
  it('config overwrite by env', () => {
    global.ARGS._all.env = 'stage'; // eslint-disable-line
    global.malmoConfig = {
      foo: 0,
      env: {
        stage: {
          publicPath: 'foo/bar',
          foo: 1,
          bar: 2,
        },
      },
    };
    const { customConstants } = require('../src/modules/configuration')();
    expect(customConstants).toMatchObject({
      foo: 1,
      bar: 2,
    });
  });
});
