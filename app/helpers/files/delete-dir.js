const removeFile = require('./remove-file');

const deleteDir = async (workDir, dirs) => {
  const promises = await dirs.map(async dir => removeFile(`${workDir}/${dir}`));
  return Promise.all(promises);
};

module.exports = deleteDir;
