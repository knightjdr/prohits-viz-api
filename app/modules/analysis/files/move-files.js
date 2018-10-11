const fs = require('fs');

const config = require('../../../../config');
const shouldResolve = require('./should-resolve');

/* Transfer files from upload folder to working directory.
** If a file is called 'samplefile.txt', use the sample file
** instead of the actual input file.path */
const moveFiles = (files, workDir, useSample = false) => (
  new Promise((resolve, reject) => {
    let moved = 0;
    files.forEach((file) => {
      let method;
      let filePath;
      if (
        useSample &&
        file.originalname === 'samplefile.txt'
      ) {
        method = 'copyFile';
        filePath = config.samplefile;
      } else {
        method = 'rename';
        filePath = file.path;
      }
      fs[method](filePath, `${workDir}/files/${file.originalname}`, (err) => {
        if (err) {
          reject(new Error(`Error moving file ${file.originalname} to task directory`));
        }
        moved += 1;
        shouldResolve(moved, files.length, resolve);
      });
    });
  })
);

module.exports = moveFiles;
