import fs from 'fs';

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

const moveFile = (dest, file, useSample) => (
  new Promise((resolve, reject) => {
    const options = defineMethodAndPath(file, useSample);
    fs[options.method](options.filePath, `${dest}/${file.originalname}`, (err) => {
      if (err) {
        reject(new Error(`Error moving file ${file.originalname} to task directory`));
      } else {
        resolve();
      }
    });
  })
);

/* Transfer files from upload folder to working directory.
** If a file is called 'samplefile.txt', use the sample file
** instead of the actual input file.path */
const moveFiles = async (files, dest, useSample = false) => {
  const promises = files?.map(async file => moveFile(dest, file, useSample));
  return Promise.all(promises);
};

export default moveFiles;
