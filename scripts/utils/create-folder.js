import mkdirp from 'mkdirp';

const createFolder = name => (
  new Promise((resolve, reject) => {
    mkdirp(name, (err) => {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  })
);

export default createFolder;
