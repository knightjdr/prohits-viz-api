import addPath from './add-path.js';
import config from '../../config/config.js';
import filterFilesToIgnore from './filter-files.js';
import getOldFiles from './get-old-files.js';
import listFiles from '../files/list-files.js';
import logger from '../logging/logger.js';
import removeFiles from './remove.js';

const clearFolder = async (directoryInfo) => {
  const { dir, lifespan } = directoryInfo;
  const files = await listFiles(dir);
  const filesWithPath = addPath(dir, files);
  const oldFiles = await getOldFiles(filesWithPath, lifespan);
  const filesToRemove = await filterFilesToIgnore(oldFiles, directoryInfo);
  await removeFiles(filesToRemove);
};

const clearFolders = async () => {
  try {
    const promises = config.temporaryDirectories.map(async directoryInfo => clearFolder(directoryInfo));
    await Promise.all(promises);
  } catch (error) {
    logger.error(`clear folders - ${error.toString()}`);
  }
};

export default clearFolders;
