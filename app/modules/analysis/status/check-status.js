const fs = require('fs');

const checkStatus = workDir => (
  new Promise((resolve, reject) => {
    fs.readFile(`${workDir}/status.json`, 'utf8', (err, data) => {
      if (!err) {
        resolve(JSON.parse(data));
      }
      reject(new Error('Could not read status file'));
    });
  })
);

module.exports = checkStatus;
