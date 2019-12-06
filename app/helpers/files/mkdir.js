import fs from 'fs';

const mkdir = dir => (
  new Promise((resolve, reject) => {
    fs.mkdir(dir, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
);

export default mkdir;
