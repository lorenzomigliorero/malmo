const fs = jest.genMockFromModule('fs');
let mockFiles = Object.create(null);

fs.existsSync = pathToFile => mockFiles[pathToFile];

fs.createMockFiles = (newMockFiles) => {
  mockFiles = Object.create(null);
  Object.keys(newMockFiles).forEach((key) => {
    mockFiles[key] = newMockFiles[key];
  });
};

module.exports = fs;
