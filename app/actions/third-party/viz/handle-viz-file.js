import path from 'path';

import config from '../../../config/config.js';
import createDirs from '../../../helpers/files/create-dirs.js';
import validate from './validate.js';
import createWorkDir from '../../../helpers/files/create-work-dir.js';
import writeFile from '../../../helpers/files/write-file.js';

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
          return createDirs(workingDir, ['interactive']);
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

export default handleVizFile;
