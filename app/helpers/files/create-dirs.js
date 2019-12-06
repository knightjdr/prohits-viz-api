import mkdir from './mkdir.js';

const createDirs = async (workDir, directories) => {
  const promises = await directories.map(async directory => mkdir(`${workDir}/${directory}`));
  await Promise.all(promises);
};

export default createDirs;
