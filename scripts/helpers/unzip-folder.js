const extract = require('extract-zip');

const unzipFolder = (zip, dest) => (
  new Promise((resolve, reject) => {
    extract(zip, { dir: dest }, (err) => {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  })
);

module.exports = unzipFolder;
