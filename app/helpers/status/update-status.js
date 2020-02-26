import listFiles from '../files/list-files.js';
import stripExt from '../files/strip-ext.js';
import writeStatus from './write-status.js';

const updateStatus = async (workDir) => {
  let files = [];
  let status = 'complete';

  try {
    /* Get a list of txt (status) files in main directory. Then
    ** get list of interactive files. Interactive folder
    ** may not exist, so want to do this in two steps
    ** since the first promise will never throw an error. */
    const statusFiles = await listFiles(workDir, '.txt');
    files = stripExt(statusFiles, files);
    const interactiveFiles = await listFiles(`${workDir}/interactive`, '.json');
    files = stripExt(interactiveFiles, files);
    return writeStatus(workDir, status, files);
  } catch (error) {
    status = 'error';
    return writeStatus(workDir, status, files, 'error');
  }
};

export default updateStatus;
