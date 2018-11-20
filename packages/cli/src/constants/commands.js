const path = require('path');
const { readFilesSync } = require('@malmo/cli-utils');

module.exports = readFilesSync(path.resolve(__dirname, '../commands/')).map(f => f.name).sort();
