jest.mock('fs');

beforeEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
  delete global.ARGS.env;
});

const CONFIG_PATH = `${process.env.PWD}/malmo.config.js`;

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
    ].forEach((mockConfig) => {
      if (NODE_ENV === 'development') {
        it('Starts with protocol', () => {
          require('fs').createMockFiles({ [CONFIG_PATH]: mockConfig });
          jest.mock(CONFIG_PATH, () => () => mockConfig, { virtual: true });

          process.env.NODE_ENV = NODE_ENV;
          const { publicPath } = require('../src/modules/configuration')();
          expect(publicPath).toEqual(expect.stringMatching(/^[a-z0-9]+:\/\//));
        });
      }
      if (NODE_ENV === 'production') {
        it('Not contains //', () => {
          require('fs').createMockFiles({ [CONFIG_PATH]: mockConfig });
          jest.mock(CONFIG_PATH, () => () => mockConfig, { virtual: true });

          process.env.NODE_ENV = NODE_ENV;
          const { publicPath } = require('../src/modules/configuration')();
          expect(publicPath).toEqual(expect.not.stringContaining('//'));
        });
      }
      it('Assert that ends with /', () => {
        require('fs').createMockFiles({ [CONFIG_PATH]: mockConfig });
        jest.mock(CONFIG_PATH, () => () => mockConfig, { virtual: true });

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
    const mockConfig = {
      foo: 0,
      env: {
        stage: {
          publicPath: 'foo/bar',
          foo: 1,
          bar: 2,
        },
      },
    };
    require('fs').createMockFiles({ [CONFIG_PATH]: mockConfig });
    jest.mock(CONFIG_PATH, () => () => mockConfig, { virtual: true });
    const { customConstants } = require('../src/modules/configuration')();
    expect(customConstants).toMatchObject({
      foo: 1,
      bar: 2,
    });
  });

  it('config as object', () => {
    const mockConfig = { foo: 0 };
    require('fs').createMockFiles({ [CONFIG_PATH]: mockConfig });
    jest.mock(CONFIG_PATH, () => mockConfig, { virtual: true });
    const { customConstants } = require('../src/modules/configuration')();
    expect(customConstants).toMatchObject({ foo: 0 });
  });
});
