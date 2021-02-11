import fs from 'fs/promises';

import config from '../../config/config.js';

const isExpired = (stat) => {
  const currTime = new Date();
  return currTime.valueOf() - stat.mtime.valueOf() > config.expiredFile;
};

const getFileStats = async (file) => {
  try {
    const stat = await fs.stat(file);
    return stat;
  } catch (error) {
    return { mtime: new Date() };
  }
};

const reduceToExpiredFiles = (stats, files) => (
  stats.reduce((accum, stat, i) => {
    if (isExpired(stat)) {
      return [...accum, files[i]];
    }
    return accum;
  }, [])
);

const getOldFiles = async (files) => {
  const promises = files.map(async file => getFileStats(file));
  const stats = await Promise.all(promises);
  return reduceToExpiredFiles(stats, files);
};

export default getOldFiles;
