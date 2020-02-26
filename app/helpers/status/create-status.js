import writeFile from '../files/write-file.js';

const createStatus = async (workDir, tool, primaryFile) => {
  try {
    const status = {
      date: new Date().toISOString(),
      primaryFile: primaryFile || tool,
      status: 'running',
      tool,
    };
    const fileContent = JSON.stringify(status, null, 2);

    await writeFile(`${workDir}/status.json`, fileContent);
  } catch (error) {
    throw new Error(`Could not create status file for task ${workDir}`);
  }
};

export default createStatus;
