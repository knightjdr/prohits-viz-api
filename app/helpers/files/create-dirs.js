const mkdir = require('./mkdir');

const createDirs = async (workDir, directories) => {
  const promises = await directories.map(async directory => mkdir(`${workDir}/${directory}`));
  await Promise.all(promises);
};

module.exports = createDirs;
