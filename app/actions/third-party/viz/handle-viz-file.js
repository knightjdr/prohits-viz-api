import fs from 'fs/promises';
import path from 'path';

import config from '../../../config/config.js';
import createDirs from '../../../helpers/files/create-dirs.js';
import createWorkDir from '../../../helpers/files/create-work-dir.js';
import logger from '../../../helpers/logging/logger.js';
import validate from './validate.js';

const handleVizFile = async (req, res) => {
  try {
    const validated = await validate(req.body);

    const workingDir = await createWorkDir();
    await createDirs(workingDir, ['interactive']);

    const { imageType } = validated.parameters;
    const file = `${workingDir}/interactive/${imageType}.json`;
    const content = JSON.stringify(validated, null, 2);
    await fs.writeFile(file, content);

    const taskFolder = path.basename(workingDir);
    const url = `${config.protocol}://${config.origin}/visualization/${taskFolder}/${imageType}`;
    res.send({ url });
  } catch (error) {
    logger.error(`third party viz - ${error.toString()}`);
    res.status(400);
    res.send({ message: error.toString() });
  }
};

export default handleVizFile;
