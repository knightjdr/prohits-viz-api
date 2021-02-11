import fs from 'fs/promises';

const createDirs = async (workDir, directories) => {
  const promises = await directories.map(async directory => fs.mkdir(`${workDir}/${directory}`));
  await Promise.all(promises);
};

export default createDirs;
