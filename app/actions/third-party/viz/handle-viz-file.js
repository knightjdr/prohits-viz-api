import path from 'path';

import config from '../../../config/config.js';
import createDirs from '../../../helpers/files/create-dirs.js';
import validate from './validate.js';
import createWorkDir from '../../../helpers/files/create-work-dir.js';
import writeFile from '../../../helpers/files/write-file.js';

const handleVizFile = async (req, res) => {
  try {
    const validated = validate(req.body);

    const workingDir = await createWorkDir();
    await createDirs(workingDir, ['interactive']);

    const { imageType } = validated.parameters;
    const file = `${workingDir}/interactive/${imageType}.json`;
    const content = JSON.stringify(validated, null, 2);
    await writeFile(file, content);

    const taskFolder = path.basename(workingDir);
    const url = `${config.protocol}://${config.origin}/visualization/${taskFolder}/${imageType}`;
    res.send({ url });
  } catch (error) {
    res.status(400);
    res.send({ message: error.toString() });
  }
};

export default handleVizFile;
