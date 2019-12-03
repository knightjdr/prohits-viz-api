const config = require('../../config/config');

const filterOutFoldersToIgnore = files => (
  files.filter(file => (
    !config.ignore.some(re => RegExp(re).test(file))
  ))
);

module.exports = filterOutFoldersToIgnore;
