const addPath = require('./add-path');
const config = require('../../config/config');
const filterOutFoldersToIgnore = require('./filter-folders');
const getOldFiles = require('./get-old-files');
const listFiles = require('../../helpers/files/list-files');
const removeFiles = require('./remove');

const clearFolders = async () => {
  const files = await Promise.all([
    listFiles(config.workDir),
    listFiles(config.upload),
  ]);

  const filesInPath = addPath(config, files);
  const oldFiles = await getOldFiles(filesInPath);
  const filesToRemove = filterOutFoldersToIgnore(oldFiles);
  await removeFiles(filesToRemove);
};

module.exports = clearFolders;
