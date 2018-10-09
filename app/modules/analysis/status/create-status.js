const fs = require('fs');

const createStatus = (workDir, body) => (
  new Promise((resolve, reject) => {
    const status = {
      analysis: body.analysisType,
      date: new Date().toISOString(),
      status: 'running',
    };
    const fileContent = JSON.stringify(status, null, 2);
    fs.writeFile(`${workDir}/status.json`, fileContent, 'utf8', (err) => {
      if (!err) {
        resolve();
      } else {
        reject(new Error(`Could not create status file in task ${workDir}`));
      }
    });
  })
);

module.exports = createStatus;
