const fs = require('fs');

const writeDownloadFile = (workDir, fileName, outputFormat) => (
  new Promise((resolve, reject) => {
    const downloadFile = `${outputFormat}/${fileName}.${outputFormat}`;
    fs.writeFile(`${workDir}/download.txt`, downloadFile, 'utf8', (err) => {
      if (!err) {
        resolve();
      } else {
        reject(new Error('Could not write download information to file'));
      }
    });
  })
);

module.exports = writeDownloadFile;
