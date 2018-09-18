const fs = require('fs');
const uuidv1 = require('uuid/v1');

const config = require('../../../config');

const workDir = () => (
  new Promise((resolve, reject) => {
    const id = uuidv1();
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
