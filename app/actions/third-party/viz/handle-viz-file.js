const path = require('path');

const config = require('../../../config/config');
const createDir = require('../../../helpers/files/create-dir');
const validate = require('./validate');
const createWorkDir = require('../../../helpers/files/create-work-dir');
const writeFile = require('../../../helpers/files/write-file');

const handleVizFile = (req, res) => (
  new Promise((resolve) => {
    const validated = validate(req.body);
    if (validated.err) {
      res.status(400);
      res.send({ message: validated.err.toString() });
      resolve();
    } else {
      let workingDir;
      createWorkDir()
        .then((dir) => {
          workingDir = dir;
          return createDir(['interactive'], workingDir);
        })
        .then(() => {
          const { imageType } = validated.json.parameters;
          const file = `${workingDir}/interactive/${imageType}.json`;
          const content = JSON.stringify(validated.json, null, 2);
          return writeFile(file, content);
        })
        .then(() => {
          const taskFolder = path.basename(workingDir);
          const { imageType } = validated.json.parameters;
          const url = `${config.protocol}://${config.origin}/visualization/${taskFolder}/${imageType}`;
          res.send({ url });
          resolve();
        })
        .catch(() => {
          res.status(500);
          res.end();
          resolve();
        });
    }
  })
);

module.exports = handleVizFile;
