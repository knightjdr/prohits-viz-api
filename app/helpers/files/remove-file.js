import rimraf from 'rimraf';

const removeFile = file => (
  new Promise((resolve, reject) => {
    rimraf(file, (err) => {
      if (!err) {
        resolve();
      }
      reject();
    });
  })
);

export default removeFile;
