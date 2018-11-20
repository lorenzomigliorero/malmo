const mock = require('mock-fs');
const fs = require('fs');

beforeEach(() => {
  mock({ './test.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]) });
});

afterEach(() => {
  mock.restore();
});

test.skip('Cli command', () => {
  const png = require('./test.png');
  console.log(png);
  const dir = 'folder-in-memory';
  fs.mkdirSync(dir);
  expect(fs.existsSync(dir)).toBeTruthy();
});
