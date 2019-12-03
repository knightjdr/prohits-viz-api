const rimraf = require('rimraf');

const removeFile = file => (
  new Promise((resolve, reject) => {
    rimraf(file, (err) => {
      if (!err) {
        resolve();
      }
      reject();
    });
  })
);

module.exports = removeFile;
