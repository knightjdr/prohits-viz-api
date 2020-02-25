import { spawn } from 'child_process';

const spawnProcess = workDir => (
  new Promise((resolve) => {
    const process = spawn(
      'pvanalyze',
      ['--settings', 'settings.json'],
      { cwd: workDir },
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
