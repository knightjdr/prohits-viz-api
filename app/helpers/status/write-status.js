const readfile = require('../files/read-file');
const writefile = require('../files/write-file');

const writeStatus = async (workDir, status, files, primaryFile) => {
  try {
    const data = await readfile(`${workDir}/status.json`);
    const json = JSON.parse(data);
    const newStatus = {
      ...json,
      files,
      primaryFile: primaryFile || json.primaryFile,
      status,
    };
    const content = JSON.stringify(newStatus, null, 2);
    await writefile(`${workDir}/status.json`, content);
  } catch (error) {
    throw new Error('Could not update status file');
  }
};

module.exports = writeStatus;
