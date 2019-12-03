const fs = require('fs');

const extToMimeType = require('./ext-to-mime-type');
const removeFile = require('../files/remove-file');

const removeFileOnCompletion = (workdir, shouldRemoveFile) => {
  if (shouldRemoveFile) {
    removeFile(workdir);
  }
};

const readStream = (workdir, file, res, shouldRemoveFile = false) => (
  new Promise((resolve, reject) => {
    res.setHeader('Content-Type', extToMimeType(file));

    const stream = fs.createReadStream(`${workdir}/${file}`);
    stream.pipe(res);
    stream.on('error', () => {
      reject(new Error(`Could not read: ${file}`));
    });
    stream.on('end', () => {
      res.end();
      removeFileOnCompletion(workdir, shouldRemoveFile);
      resolve();
    });
  })
);

module.exports = readStream;
