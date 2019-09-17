const updatePackage = require('../src/modules/update-package');

jest.mock('fs', () => new (require('memfs').Volume)());

beforeEach(() => {
  require('fs').writeFileSync('/mocked-package.json', JSON.stringify({
    name: 'bar',
    description: 'foo',
  }));
});

describe('update package', () => {
  it('basic', () => {
    updatePackage({
      name: 'foo',
      packagePath: '/mocked-package.json',
    });
    const pkg = JSON.parse(require('fs').readFileSync('/mocked-package.json').toString());
    expect(pkg).toEqual(expect.objectContaining({
      name: 'foo',
      description: 'foo',
    }));
  });

  it('with description param', () => {
    updatePackage({
      name: 'foo',
      description: 'bar',
      packagePath: '/mocked-package.json',
    });
    const pkg = JSON.parse(require('fs').readFileSync('/mocked-package.json').toString());
    expect(pkg).toEqual(expect.objectContaining({
      name: 'foo',
      description: 'bar',
    }));
  });
});
