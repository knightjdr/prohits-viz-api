const writeFile = require('../../files/write-file');

const createStatus = (workDir, body, primaryFile) => (
  new Promise((resolve, reject) => {
    const status = {
      analysis: body.analysisType,
      date: new Date().toISOString(),
      primaryFile: primaryFile || body.analysisType,
      status: 'running',
    };
    const fileContent = JSON.stringify(status, null, 2);
    writeFile(`${workDir}/status.json`, fileContent)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject(new Error(`Could not create status file for task ${workDir}`));
      });
  })
);

module.exports = createStatus;
