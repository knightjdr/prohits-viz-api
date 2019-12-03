const writeFile = require('../files/write-file');

const writeDownloadFile = async (workDir, fileName, outputFormat) => {
  const downloadFile = `${outputFormat}/${fileName}.${outputFormat}`;
  await writeFile(`${workDir}/download.txt`, downloadFile);
};

module.exports = writeDownloadFile;
