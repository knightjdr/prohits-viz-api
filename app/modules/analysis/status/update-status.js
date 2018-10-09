const existsError = require('./exists-error');
const listFiles = require('../files/list-files');
const writeStatus = require('./write-status');

const updateStatus = (workDir, form, socket) => (
  new Promise((resolve) => {
    const files = ['log'];
    let status = 'complete';

    // Check for error file.
    existsError(workDir)
      .then(() => listFiles(workDir, 'interactive'))
      .then((interactiveFiles) => {
        files.push(interactiveFiles);
        writeStatus(workDir, status, files, socket);
        resolve();
      })
      .catch(() => {
        status = 'error';
        files.push('error');
        writeStatus(workDir, status, files, socket);
        resolve();
      });
  })
);

module.exports = updateStatus;
