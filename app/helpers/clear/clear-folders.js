import addPath from './add-path.js';
import config from '../../config/config.js';
import filterOutFoldersToIgnore from './filter-folders.js';
import getOldFiles from './get-old-files.js';
import listFiles from '../files/list-files.js';
import removeFiles from './remove.js';

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

export default clearFolders;
