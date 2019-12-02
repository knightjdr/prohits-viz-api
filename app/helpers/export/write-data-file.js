const fs = require('fs');

const writeDataFile = (workDir, data) => (
  new Promise((resolve, reject) => {
    fs.writeFile(`${workDir}/data.json`, JSON.stringify(data), 'utf8', (err) => {
      if (!err) {
        resolve();
      } else {
        reject(new Error('Could not write data to file'));
      }
    });
  })
);

module.exports = writeDataFile;
