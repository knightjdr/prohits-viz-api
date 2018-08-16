const rimraf = require('rimraf');
const { spawn } = require('child_process');

// Spawn Golang task to sync minimap.
const spawnProcess = (socket, workingDir) => (
  new Promise((resolve) => {
    let url = '';
    const syncProcess = spawn(
      'pvsync',
      [
        '-json',
        'map.json',
      ],
      {
        cwd: workingDir,
      },
    );
    syncProcess.stdout.on('data', (data) => {
      url += data.toString();
    });
    syncProcess.on('error', () => {
      socket.emit('action', { type: 'SYNC_ERROR' });
      resolve();
    });
    syncProcess.on('exit', (err) => {
      if (!err) {
        socket.emit('action', { syncImage: url, type: 'MAP_SYNCHED' });
        // Delete working directory.
        rimraf(workingDir, () => {});
      } else {
        socket.emit('action', { type: 'SYNC_ERROR' });
      }
      resolve();
    });
  })
);

module.exports = spawnProcess;
