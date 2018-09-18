const fs = require('fs');

const exists = file => (
  new Promise((resolve, reject) => {
    fs.access(file, (err) => {
      if (!err) {
        resolve();
      } else {
        reject(new Error(`${file} does not exist`));
      }
    });
  })
);

module.exports = exists;
