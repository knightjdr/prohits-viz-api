import fs from 'fs/promises';

import config from '../../config/config.js';

const defineMethodAndPath = (file, useSample) => (
  useSample && Boolean(useSample) && file.originalname === 'samplefile.txt'
    ? {
      method: 'copyFile',
      filePath: config.samplefile,
    }
    : {
      method: 'rename',
      filePath: file.path,
    }
);

const moveFile = async (dest, file, useSample) => {
  try {
    const options = defineMethodAndPath(file, useSample);
    await fs[options.method](options.filePath, `${dest}/${file.originalname}`);
  } catch (error) {
    throw new Error(`Error moving file ${file.originalname} to task directory`);
  }
};

/* Transfer files from upload folder to working directory.
** If a file is called 'samplefile.txt', use the sample file
** instead of the actual input file.path */
const moveFiles = async (files, dest, useSample = false) => {
  if (!files || files.length === 0) {
    return Promise.resolve();
  }
  const promises = files?.map(async file => moveFile(dest, file, useSample));
  return Promise.all(promises);
};

export default moveFiles;
