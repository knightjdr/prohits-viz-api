const removeFile = require('../files/remove-file');

const remove = async (files) => {
  const promises = files.map(async file => removeFile(file));
  return Promise.all(promises);
};

module.exports = remove;
