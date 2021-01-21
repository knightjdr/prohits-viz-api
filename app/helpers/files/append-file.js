import fs from 'fs';

const appendFile = (file, content, encoding = 'utf8') => (
  new Promise((resolve, reject) => {
    fs.appendFile(file, content, encoding, (err) => {
      if (!err) {
        resolve();
      }
      reject(new Error(`Could not append to file: ${file}`));
    });
  })
);

export default appendFile;
