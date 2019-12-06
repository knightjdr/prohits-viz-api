import fs from 'fs';

const filterFiles = (files, ext) => (
  ext ? files.filter(file => file.endsWith(ext)) : files
);

/* Get list of files in specified directory. If fileExt is specified,
** only files with that extension will be returned. */
const listFiles = (dir, fileExt = '') => (
  new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (!err) {
        resolve(filterFiles(files, fileExt));
      }
      reject(new Error(`Error listing ${dir} folder`));
    });
  })
);

export default listFiles;
