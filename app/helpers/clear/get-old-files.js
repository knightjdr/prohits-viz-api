import fs from 'fs/promises';

const isExpired = (stat, lifespan) => {
  const currTime = new Date();
  return currTime.valueOf() - stat.mtime.valueOf() > lifespan;
};

const getFileStats = async (filename) => {
  try {
    const stat = await fs.stat(filename);
    return {
      ...stat,
      filename,
    };
  } catch (error) {
    return {
      mtime: new Date(),
      filename,
    };
  }
};

const reduceToExpiredFiles = (stats, lifespan) => (
  stats.reduce((accum, stat) => {
    if (isExpired(stat, lifespan)) {
      return [...accum, stat.filename];
    }
    return accum;
  }, [])
);

const getOldFiles = async (files, lifespan) => {
  const promises = files.map(async filename => getFileStats(filename));
  const stats = await Promise.all(promises);
  return reduceToExpiredFiles(stats, lifespan);
};

export default getOldFiles;
