const fs = require('fs');
const rimraf = require('rimraf');
const { spawn } = require('child_process');

const workDir = require('../helpers/work-dir');

// Spawn Golang process.
const SpawnProcess = (body, socket, workingDir) => {
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
  });
  syncProcess.on('exit', (err) => {
    if (!err) {
      socket.emit('action', { syncImage: url, type: 'MAP_SYNCHED' });
      // Delete working directory.
      rimraf(workingDir, () => {});
    } else {
      socket.emit('action', { type: 'SYNC_ERROR' });
    }
  });
};

// Generate a minimap for a data set.
const Sync = (socket, body) => (
  new Promise((resolve) => {
    // Validate input.

    // Generate working dir.
    const workingDir = workDir();

    // Generate image directories.
    fs.mkdirSync(`${workingDir}/minimap`);
    fs.mkdirSync(`${workingDir}/svg`);

    // Write JSON to file and span process.
    fs.writeFile(`${workingDir}/map.json`, JSON.stringify(body), 'utf8', (err) => {
      if (!err) {
        SpawnProcess(body, socket, workingDir);
      } else {
        socket.emit('action', { type: 'SYNC_ERROR' });
      }
    });

    resolve({ status: 200 });
  })
);

module.exports = Sync;
