const fs = require('fs');
const nanoid = require('nanoid');

const config = require('../../config/config');

const createWorkDir = () => (
  new Promise((resolve, reject) => {
    const id = nanoid(14);
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

module.exports = createWorkDir;
