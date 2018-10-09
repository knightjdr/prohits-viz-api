const fs = require('fs');

const existsError = workDir => (
  new Promise((resolve) => {
    fs.stat(`${workDir}/error.txt`, (err) => {
      if (!err) {
        resolve(new Error('Error file exists'));
      }
      resolve();
    });
  })
);

module.exports = existsError;
