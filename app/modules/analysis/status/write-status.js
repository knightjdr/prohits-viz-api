const readfile = require('../files/read-file');
const writefile = require('../files/write-file');

const writeStatus = (workDir, status, files) => (
  new Promise((resolve, reject) => {
    readfile(`${workDir}/status.json`)
      .then((data) => {
        const json = JSON.parse(data);
        const newStatus = {
          ...json,
          files,
          status,
        };
        const content = JSON.stringify(newStatus, null, 2);
        return writefile(`${workDir}/status.json`, content);
      })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject(new Error('Could not update status file'));
      });
  })
);

module.exports = writeStatus;
