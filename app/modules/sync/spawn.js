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
    syncProcess.on('error', (err) => {
      reject(err);
    });
    syncProcess.on('exit', (err) => {
      if (!err) {
        socket.emit('action', { syncImage: url, type: 'MAP_SYNCHED' });
        rimraf(workingDir, () => {});
        resolve();
      } else {
        reject(err);
      }
    });
  })
);

module.exports = spawnProcess;
