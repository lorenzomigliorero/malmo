const editJsonFile = require('edit-json-file');
const { kebabCase } = require('lodash');

module.exports = ({
  name,
  description,
  packagePath = `${process.env.PWD}/package.json`,
}) => {
  const mainPackage = editJsonFile(packagePath);
  mainPackage.set('name', kebabCase(name));
  if (description) mainPackage.set('description', description);
  mainPackage.set('version', '1.0.0');
  mainPackage.save();
};
