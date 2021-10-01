import rimraf from 'rimraf';

const removeFile = file => (
  new Promise((resolve, reject) => {
    rimraf(file, (err) => {
      if (!err) {
        resolve();
      }
      reject(new Error('could not remove file'));
    });
  })
);

export default removeFile;
