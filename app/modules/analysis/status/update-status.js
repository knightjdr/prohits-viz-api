const listFiles = require('../../files/list-files');
const stripExt = require('../../files/strip-ext');
const writeStatus = require('./write-status');

const updateStatus = workDir => (
  new Promise((resolve) => {
    let files = [];
    let status = 'complete';

    /* Get a list of txt (status) files in main directory. Then
    ** get list of interactive files. Interactive folder
    ** may not exist, so want to do this in two steps
    ** since the first promise will never throw an error. */
    listFiles(workDir, '.txt')
      .then((statusFiles) => {
        files = stripExt(statusFiles, files);
        return listFiles(`${workDir}/interactive`, '.json');
      }).then((interactiveFiles) => {
        files = stripExt(interactiveFiles, files);
        return writeStatus(workDir, status, files);
      })
      .then(() => {
        resolve('here');
      })
      .catch(() => {
        status = 'error';
        writeStatus(workDir, status, files, 'error');
        resolve('here2');
      });
  })
);

module.exports = updateStatus;
