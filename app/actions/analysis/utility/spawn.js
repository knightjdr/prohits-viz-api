import { spawn } from 'child_process';
import { parseArgsStringToArgv } from 'string-argv';

const spawnProcess = (command, workDir) => (
  new Promise((resolve) => {
    const args = parseArgsStringToArgv(command);
    const cmd = args.shift();

    const process = spawn(
      cmd,
      args,
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
