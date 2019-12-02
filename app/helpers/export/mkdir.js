const fs = require('fs');

/* Dirs is an array of strings that should get made into directories
** in the workDir arg. The workDir must already exist. */
const mkdir = (workDir, dirs) => (
  new Promise((resolve, reject) => {
    if (
      !dirs ||
      !Array.isArray(dirs) ||
      dirs.length < 1
    ) {
      reject(new Error('No directories specified'));
    }

    const respond = (made, total) => {
      if (made === total) {
        resolve();
      }
    };

    let dirsMade = 0;
    const totalDirs = dirs.length;
    dirs.forEach((dir) => {
      fs.mkdir(`${workDir}/${dir}`, (err) => {
        if (!err) {
          dirsMade += 1;
          respond(dirsMade, totalDirs);
        } else {
          reject(new Error('Could not make subdirectories'));
        }
      });
    });
  })
);

module.exports = mkdir;
