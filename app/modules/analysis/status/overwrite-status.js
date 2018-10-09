const fs = require('fs');

const overwriteStatus = (workDir, newStatus) => (
  new Promise((resolve, reject) => {
    const fileContent = JSON.stringify(newStatus, null, 2);
    fs.writeFile(`${workDir}/status.json`, fileContent, 'utf8', (err) => {
      if (!err) {
        resolve();
      } else {
        reject(new Error(`Could not update status file in task ${workDir}`));
      }
    });
  })
);

module.exports = overwriteStatus;
