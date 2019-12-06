import { spawn } from 'child_process';

import removeFile from '../../helpers/files/remove-file.js';

const emitAction = (socket, snapshotID, url) => {
  socket.emit('action', { snapshotID, syncedImage: url, type: 'MINIMAP_SYNCHED' });
};

const initializeSpawn = workingDir => (
  spawn(
    'pvsync',
    ['-json', 'data.json'],
    { cwd: workingDir },
  )
);

const uri = {
  data: '',
  appendData: function append(data) {
    this.data += data.toString();
  },
};

const spawnProcess = (socket, workingDir, snapshotID) => (
  new Promise((resolve, reject) => {
    const syncProcess = initializeSpawn(workingDir);

    syncProcess.stdout.on('data', (data) => {
      uri.appendData(data);
    });
    syncProcess.on('error', (err) => {
      reject(err);
    });
    syncProcess.on('exit', (err) => {
      if (!err) {
        emitAction(socket, snapshotID, uri.data);
        removeFile(workingDir);
        resolve();
      } else {
        reject(err);
      }
    });
  })
);

export default spawnProcess;
