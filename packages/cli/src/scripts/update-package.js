const editJsonFile = require('edit-json-file');
const { kebabCase } = require('lodash');

module.exports = ({
  name,
  description,
}) => {
  const mainPackage = editJsonFile(`${process.env.PWD}/package.json`);
  mainPackage.set('name', kebabCase(name));
  if (description) mainPackage.set('description', description);
  mainPackage.set('version', '0.0.0');
  mainPackage.save();
};
