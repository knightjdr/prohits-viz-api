const fs = require('fs');
const uuidv1 = require('uuid/v1');

const config = require('../../../config');

const workDir = () => {
  const id = uuidv1();
  const workingDir = `${config.workDir}${id}`;
  fs.mkdirSync(workingDir);
  return workingDir;
};

module.exports = workDir;
