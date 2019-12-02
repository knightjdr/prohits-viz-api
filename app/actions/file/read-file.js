const fs = require('fs');

const readFile = (file, encoding) => (
  new Promise((resolve, reject) => {
    fs.readFile(file, encoding, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(new Error(`Could not read ${file}`));
      }
    });
  })
);

module.exports = readFile;
