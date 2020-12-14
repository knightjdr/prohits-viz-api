import fs from 'fs';
import { nanoid } from 'nanoid';

import config from '../../config/config.js';

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

export default createWorkDir;
