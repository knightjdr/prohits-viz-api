const config = require('../../../config');

const checkIgnore = files => (
  files.filter(file => (
    !config.ignore.some(re => RegExp(re).test(file))
  ))
);

module.exports = checkIgnore;
