const rimraf = require('rimraf');

const remove = (files) => {
  files.forEach((file) => {
    rimraf(file, () => {});
  });
};

module.exports = remove;
