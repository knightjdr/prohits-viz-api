const fs = require('fs');

const exists = (file, shouldExist = true) => (
  new Promise((resolve, reject) => {
    fs.stat(file, (err) => {
      if (shouldExist && err) {
        // File should exist but it does not.
        reject(new Error(`Error ${file} does not exist`));
      } else if (!shouldExist && !err) {
        // File should not exist but it does.
        reject(new Error(`Error ${file} exists`));
      } else if (!err) {
        // Resolve with true to indicate file exists.
        resolve(true);
      }
      resolve(false);
    });
  })
);

module.exports = exists;
