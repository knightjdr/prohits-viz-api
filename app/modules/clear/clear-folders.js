const addPath = require('./add-path');
const checkIgnore = require('./check-ignore');
const config = require('../../../config');
const listFiles = require('../files/list-files');
const oldFiles = require('./old-files');
const removeFiles = require('./remove');

/* List files in folders, gets age, and delete any if they do not
** match an ignore pattern and are older than the specified config time. */
const clearFolders = () => {
  Promise.all([
    listFiles(config.workDir),
    listFiles(config.upload),
  ])
    .then((files) => {
      const filesWithPath = addPath(config.workDir, config.upload, files[0], files[1]);
      return oldFiles(filesWithPath);
    })
    .then((old) => {
      const toRemove = checkIgnore(old);
      removeFiles(toRemove);
    });
};

module.exports = clearFolders;
