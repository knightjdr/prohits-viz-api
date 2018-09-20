const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const mimeType = {
  pdf: 'application/pdf',
  png: 'image/png',
  svg: 'image/svg+xml',
};

const readStream = (workdir, file, res) => (
  new Promise((resolve, reject) => {
    const ext = path.extname(file).substr(1);
    res.setHeader('Content-Type', mimeType[ext]);
    const stream = fs.createReadStream(`${workdir}/${file}`);
    stream.pipe(res);
    stream.on('error', () => {
      reject(new Error('Error reading file'));
    });
    stream.on('end', () => {
      res.end();
      rimraf(workdir, () => {});
      resolve();
    });
  })
);

module.exports = readStream;
