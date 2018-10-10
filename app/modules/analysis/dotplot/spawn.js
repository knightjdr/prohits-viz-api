const { spawn } = require('child_process');

const flags = require('./spawn-flags');

// Spawn Golang task to sync minimap.
const spawnProcess = (form, workDir) => (
  new Promise((resolve) => {
    const processFlags = flags(form);
    const process = spawn(
      'pvanalyze',
      processFlags,
      {
        cwd: workDir,
      },
    );
    process.on('error', () => {
      resolve();
    });
    process.on('exit', () => {
      resolve();
    });
  })
);

module.exports = spawnProcess;
