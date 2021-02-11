import fs from 'fs/promises';
import { nanoid } from 'nanoid';

import config from '../../config/config.js';

const createWorkDir = async () => {
  try {
    const id = nanoid(14);
    const workingDir = `${config.workDir}${id}`;
    await fs.mkdir(workingDir);
    return workingDir;
  } catch (error) {
    throw new Error('Could not make working directory');
  }
};

export default createWorkDir;
