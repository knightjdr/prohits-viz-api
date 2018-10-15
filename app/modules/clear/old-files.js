const fs = require('fs');

const config = require('../../../config');
const shouldResolve = require('../files/should-resolve');

/* Gets a list of files older than time specified in config. */
const oldFiles = files => (
  new Promise((resolve) => {
    const currTime = new Date();
    const old = [];
    let processed = 0;
    files.forEach((file) => {
      fs.stat(file, (err, stat) => {
        if (
          !err &&
          currTime.valueOf() - stat.mtime.valueOf() > config.expiredFile
        ) {
          old.push(file);
        }
        processed += 1;
        shouldResolve(processed, files.length, resolve, old);
      });
    });
  })
);

module.exports = oldFiles;
