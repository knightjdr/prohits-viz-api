import fs from 'fs/promises';

const writeDataFile = async (workDir, data) => {
  await fs.writeFile(`${workDir}/data.json`, JSON.stringify(data));
};

export default writeDataFile;
