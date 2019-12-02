const rimraf = require('rimraf');

const shouldResolve = require('./should-resolve');

const deleteDir = (dirs, workDir) => (
  new Promise((resolve) => {
    let deleted = 0;
    dirs.forEach((dir) => {
      rimraf(`${workDir}/${dir}`, (err) => {
        if (err) {
          resolve(err);
        }
        deleted += 1;
        shouldResolve(deleted, dirs.length, resolve);
      });
    });
  })
);

module.exports = deleteDir;
