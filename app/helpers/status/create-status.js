import fs from 'fs/promises';

const createStatus = async (workDir, options) => {
  try {
    const { primaryFile, status, tool } = options;
    const taskStatus = {
      date: new Date().toISOString(),
      primaryFile: primaryFile || tool,
      status: status || 'running',
      tool,
    };
    const fileContent = JSON.stringify(taskStatus, null, 2);

    await fs.writeFile(`${workDir}/status.json`, fileContent);
  } catch (error) {
    throw new Error(`Could not create status file for task ${workDir}`);
  }
};

export default createStatus;
