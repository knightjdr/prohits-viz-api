import removeFile from '../files/remove-file.js';

const remove = async (files) => {
  const promises = files.map(async file => removeFile(file));
  return Promise.all(promises);
};

export default remove;
