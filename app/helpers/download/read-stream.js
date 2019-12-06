import fs from 'fs';

import extToMimeType from './ext-to-mime-type.js';
import removeFile from '../files/remove-file.js';

const removeFileOnCompletion = (workdir, shouldRemoveFile) => {
  if (shouldRemoveFile) {
    removeFile(workdir);
  }
};

const readStream = (workdir, file, res, shouldRemoveFile = false) => (
  new Promise((resolve, reject) => {
    res.setHeader('Content-Type', extToMimeType(file));

    const stream = fs.createReadStream(`${workdir}/${file}`);
    stream.pipe(res);
    stream.on('error', () => {
      reject(new Error(`Could not read: ${file}`));
    });
    stream.on('end', () => {
      res.end();
      removeFileOnCompletion(workdir, shouldRemoveFile);
      resolve();
    });
  })
);

export default readStream;
