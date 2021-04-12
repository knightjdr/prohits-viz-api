import fs from 'fs';

import config from '../../config/config.js';
import extToMimeType from './ext-to-mime-type.js';
import removeFile from '../files/remove-file.js';

export const removeFileOnCompletion = (file, shouldRemoveFile) => {
  const workDir = file.replace(config.workDir, '').split('/')[0];
  const workDirPath = `${config.workDir}${workDir}`;
  if (shouldRemoveFile) {
    removeFile(workDirPath);
  }
};

const readStream = (file, res, shouldRemoveFile = false) => (
  new Promise((resolve, reject) => {
    res.setHeader('Content-Type', extToMimeType(file));

    const stream = fs.createReadStream(file);
    stream.pipe(res);
    stream.on('error', () => {
      reject(new Error(`Could not read: ${file}`));
    });
    stream.on('end', () => {
      res.end();
      removeFileOnCompletion(file, shouldRemoveFile);
      resolve();
    });
  })
);

export default readStream;
