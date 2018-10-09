const fs = require('fs');
const Puid = require('puid');

const config = require('../../../config');

const workDir = () => (
  new Promise((resolve, reject) => {
    const id = new Puid(false).generate();
    const workingDir = `${config.workDir}${id}`;
    fs.mkdir(workingDir, (err) => {
      if (!err) {
        resolve(workingDir);
      } else {
        reject(new Error('Could not make working directory'));
      }
    });
  })
);

module.exports = workDir;
