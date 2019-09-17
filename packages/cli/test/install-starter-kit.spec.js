const installStarterKit = require('../src/modules/install-starter-kit');

jest.mock(`${process.env.PWD}/malmo.config.js`, () => () => ({
  command: {
    preinstall: [
      'foo',
    ],
    postinstall: [
      'bar',
      'ls',
    ],
  },
}), { virtual: true });

it('Test command order execution', async () => {
  const onResolveCommand = jest.fn();
  await installStarterKit({
    onResolveCommand,
    install: [],
  });
  expect(onResolveCommand).toHaveBeenCalledWith({
    status: expect.stringContaining('error'),
    error: expect.any(Error),
    command: expect.stringContaining('foo'),
  });
  expect(onResolveCommand).toHaveBeenCalledWith({
    status: expect.stringContaining('error'),
    error: expect.any(Error),
    command: expect.stringContaining('bar'),
  });
  expect(onResolveCommand).toHaveBeenCalledWith({
    status: expect.stringContaining('success'),
    command: expect.stringContaining('ls'),
  });
});
