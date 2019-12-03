const fs = require('fs');

const config = require('../../config/config');

const isExpired = (stat) => {
  const currTime = new Date();
  return currTime.valueOf() - stat.mtime.valueOf() > config.expiredFile;
};

const getFileStats = file => (
  new Promise((resolve) => {
    fs.stat(file, (err, stat) => {
      if (!err) {
        resolve(stat);
      }
      resolve({ mtime: new Date() });
    });
  })
);

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

module.exports = getOldFiles;
