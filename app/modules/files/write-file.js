const fs = require('fs');

const writeFile = (file, content, encoding = 'utf8') => (
  new Promise((resolve, reject) => {
    fs.writeFile(file, content, encoding, (err) => {
      if (!err) {
        resolve();
      }
      reject(new Error(`Could not write to file: ${file}`));
    });
  })
);

module.exports = writeFile;