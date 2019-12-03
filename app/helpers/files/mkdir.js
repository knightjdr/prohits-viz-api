const fs = require('fs');

const mkdir = dir => (
  new Promise((resolve, reject) => {
    fs.mkdir(dir, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
);

module.exports = mkdir;
