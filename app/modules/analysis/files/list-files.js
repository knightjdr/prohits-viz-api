const fs = require('fs');

const listFiles = (workDir, dir) => (
  new Promise((resolve, reject) => {
    fs.readdir(`${workDir}/${dir}`, (err, files) => {
      if (!err) {
        resolve(files);
      }
      reject(new Error(`Error listing ${dir} folder`));
    });
  })
);

module.exports = listFiles;
