const fs = require('fs');

const config = require('../../config/config');

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

const moveFile = (workdir, file, useSample) => (
  new Promise((resolve, reject) => {
    const options = defineMethodAndPath(file, useSample);
    fs[options.method](options.filePath, `${workdir}/files/${file.originalname}`, (err) => {
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
const moveFiles = async (files, workDir, useSample = false) => {
  const promises = files.map(async file => moveFile(workDir, file, useSample));
  return Promise.all(promises);
};

module.exports = moveFiles;
