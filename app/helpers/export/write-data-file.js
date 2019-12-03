const writeFile = require('../files/write-file');

const writeDataFile = async (workDir, data) => {
  await writeFile(`${workDir}/data.json`, JSON.stringify(data));
};

module.exports = writeDataFile;
