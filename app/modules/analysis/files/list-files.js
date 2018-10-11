const fs = require('fs');

/* Get list of files in specified directory. If fileExt is specified,
** only files with that extension will be returned. */
const listFiles = (dir, fileExt = '') => (
  new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (!err) {
        let filtered = files;
        if (fileExt) {
          filtered = filtered.filter(file => file.endsWith(fileExt));
        }
        resolve(filtered);
      }
      reject(new Error(`Error listing ${dir} folder`));
    });
  })
);

module.exports = listFiles;
