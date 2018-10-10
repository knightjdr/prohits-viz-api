const fs = require('fs');

const readFile = (file, encoding = 'utf8') => (
  new Promise((resolve, reject) => {
    fs.readFile(file, encoding, (err, data) => {
      if (!err) {
        resolve(data);
      }
      reject(new Error(`Could not read file: ${file}`));
    });
  })
);

module.exports = readFile;