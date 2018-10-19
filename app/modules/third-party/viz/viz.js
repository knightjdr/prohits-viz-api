const path = require('path');

const config = require('../../../../config');
const createDir = require('../../files/create-dir');
const validate = require('./validate');
const workDir = require('../../helpers/work-dir');
const writeFile = require('../../files/write-file');

const viz = (req, res) => {
  const validated = validate(req.body);
  if (validated.err) {
    res.status(400);
    res.send({ message: validated.err.toString() });
  } else {
    let workingDir;
    workDir()
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
        const url = `${config.origin}/visualization/${taskFolder}/${imageType}`;
        res.send({ url });
      })
      .catch(() => {
        res.status(500);
        res.end();
      });
  }
};

module.exports = viz;
