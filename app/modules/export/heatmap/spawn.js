const path = require('path');
const { spawn } = require('child_process');

// Spawn Golang task to generate image for saving.
const spawnProcess = (socket, workingDir, outputType) => (
  new Promise((resolve, reject) => {
    const syncProcess = spawn(
      'pvexport',
      [
        '-json',
        'data.json',
        '-type',
        outputType,
      ],
      {
        cwd: workingDir,
      },
    );
    syncProcess.on('error', () => {
      reject();
    });
    syncProcess.on('exit', (err) => {
      if (!err) {
        const task = path.basename(workingDir);
        socket.emit('action', { task, type: 'SAVED_IMAGE' });
      } else {
        reject();
      }
      resolve();
    });
  })
);

module.exports = spawnProcess;
