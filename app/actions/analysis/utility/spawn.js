import { exec } from 'child_process';

const spawnProcess = (command, workDir) => (
  new Promise((resolve) => {
    const process = exec(
      command,
      { cwd: workDir },
    );
    process.on('error', (err) => {
      resolve(err.toString());
    });
    process.on('exit', (err) => {
      if (err) {
        resolve(err.toString());
      }
      resolve();
    });
  })
);

export default spawnProcess;
