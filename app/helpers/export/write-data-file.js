import writeFile from '../files/write-file.js';

const writeDataFile = async (workDir, data) => {
  await writeFile(`${workDir}/data.json`, JSON.stringify(data));
};

export default writeDataFile;
