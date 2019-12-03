const writeFile = require('../files/write-file');

const createStatus = async (workDir, body, primaryFile) => {
  try {
    const status = {
      analysis: body.analysisType,
      date: new Date().toISOString(),
      primaryFile: primaryFile || body.analysisType,
      status: 'running',
    };
    const fileContent = JSON.stringify(status, null, 2);

    await writeFile(`${workDir}/status.json`, fileContent);
  } catch (error) {
    throw new Error(`Could not create status file for task ${workDir}`);
  }
};

module.exports = createStatus;
