import readfile from '../files/read-file.js';
import writefile from '../files/write-file.js';

const setPrimaryFile = (files, primaryFile, currentChoice) => {
  if (files.includes('error')) {
    return 'error';
  } if (primaryFile) {
    return primaryFile;
  }
  return currentChoice;
};

const writeStatus = async (workDir, status, files, primaryFile) => {
  try {
    const data = await readfile(`${workDir}/status.json`);
    const json = JSON.parse(data);
    const primary = setPrimaryFile(files, primaryFile, json.primaryFile);
    const newStatus = {
      ...json,
      files,
      primaryFile: primary,
      status,
    };
    const content = JSON.stringify(newStatus, null, 2);
    await writefile(`${workDir}/status.json`, content);
    return newStatus;
  } catch (error) {
    throw new Error('Could not update status file');
  }
};

export default writeStatus;
