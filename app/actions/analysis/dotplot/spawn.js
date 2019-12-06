import { spawn } from 'child_process';

import flags from './spawn-flags.js';

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

export default spawnProcess;
