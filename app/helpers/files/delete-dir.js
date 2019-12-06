import removeFile from './remove-file.js';

const deleteDir = async (workDir, dirs) => {
  const promises = await dirs.map(async dir => removeFile(`${workDir}/${dir}`));
  return Promise.all(promises);
};

export default deleteDir;
