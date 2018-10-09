const fs = require('fs');

const shouldResolve = require('./should-resolve');

const createDirs = (dirs, workDir) => (
  new Promise((resolve, reject) => {
    let created = 0;
    dirs.forEach((dir) => {
      fs.mkdir(`${workDir}/${dir}`, (err) => {
        if (err) {
          reject(new Error('Error creating task directories'));
        }
        created += 1;
        shouldResolve(created, dirs.length, resolve);
      });
    });
  })
);

module.exports = createDirs;
