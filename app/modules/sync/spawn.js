const rimraf = require('rimraf');
const { spawn } = require('child_process');

// Spawn Golang task to sync minimap.
const spawnProcess = (socket, workingDir) => (
  new Promise((resolve, reject) => {
    let url = '';
    const syncProcess = spawn(
      'pvsync',
      [
        '-json',
        'data.json',
      ],
      {
        cwd: workingDir,
      },
    );
    syncProcess.stdout.on('data', (data) => {
      url += data.toString();
    });
    syncProcess.on('error', () => {
      reject();
    });
    syncProcess.on('exit', (err) => {
      if (!err) {
        socket.emit('action', { syncImage: url, type: 'MAP_SYNCHED' });
        // Delete working directory.
        rimraf(workingDir, () => {});
        resolve();
      } else {
        reject();
      }
    });
  })
);

module.exports = spawnProcess;
