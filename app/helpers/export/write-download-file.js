import writeFile from '../files/write-file.js';

const writeDownloadFile = async (workDir, fileName, outputFormat) => {
  const downloadFile = `${outputFormat}/${fileName}.${outputFormat}`;
  await writeFile(`${workDir}/download.txt`, downloadFile);
};

export default writeDownloadFile;
