const bddStdin = require('bdd-stdin');
const prompt = require('../src/modules/prompt');

jest.mock('@malmo/cli-utils', () => ({
  getGlobalStarterKits: jest.fn(() => [
    {
      name: 'foo',
      version: '0.0.0',
      description: 'lorem ipsum',
    },
    {
      name: 'bar',
      version: '0.0.0',
      description: 'lorem ipsum',
    },
  ]),
  getRemoteStarterKits: jest.fn(() => Promise.resolve()),
}));

it('Init prompt', async () => {
  bddStdin(
    'foo', '\n', // name, type foo then enter
    'bar', '\n', // description, type bar then enter
    '\n', // npmClient -> yarn
    '\n', // starterKit
    '\n',
  );
  const {
    npmClient,
    starterKit,
    name,
    description,
  } = await prompt();
  expect(npmClient).toEqual('yarn');
  expect(starterKit.name).toEqual('foo');
  expect(name).toEqual('foo');
  expect(description).toEqual('bar');
});
