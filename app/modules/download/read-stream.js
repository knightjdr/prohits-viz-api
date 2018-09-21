const fs = require('fs');
const rimraf = require('rimraf');

const extToMimeType = require('./ext-to-mime-type');

const readStream = (workdir, file, res) => (
  new Promise((resolve, reject) => {
    res.setHeader('Content-Type', extToMimeType(file));
    const stream = fs.createReadStream(`${workdir}/${file}`);
    stream.pipe(res);
    stream.on('error', () => {
      reject(new Error(`Could not read: ${file}`));
    });
    stream.on('end', () => {
      res.end();
      rimraf(workdir, () => {});
      resolve();
    });
  })
);

module.exports = readStream;
