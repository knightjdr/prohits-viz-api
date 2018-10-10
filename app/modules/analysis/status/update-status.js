const path = require('path');

const listFiles = require('../files/list-files');
const writeStatus = require('./write-status');

/* Removes the extension for an array of files and
** appends the file name to the arr argument. */
const stripExt = (files, arr) => (
  files.reduce((accum, file) => {
    accum.push(path.parse(file).name);
    return accum;
  }, [...arr])
);

const updateStatus = workDir => (
  new Promise((resolve) => {
    let files = [];
    let status = 'complete';

    /* Get a list of txt (status) files in main directory. Then
    ** get list of interactive files. Interactive folder
    ** may not exists, so want to do this in two steps
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
        resolve();
      })
      .catch(() => {
        status = 'error';
        writeStatus(workDir, status, files);
        resolve();
      });
  })
);

module.exports = {
  stripExt,
  updateStatus,
};
