import { promises as fs } from 'fs';
import { spawn } from 'child_process';

import removeFile from '../../helpers/files/remove-file.js';

const emitAction = (socket, snapshotID, url) => {
  socket.emit('action', { snapshotID, syncedImage: url, type: 'MINIMAP_SYNCHED' });
};

const initializeSpawn = workingDir => (
  spawn(
    'pvsync',
    ['--file', 'data.json'],
    { cwd: workingDir },
  )
);

const spawnProcess = (socket, workingDir, snapshotID) => (
  new Promise((resolve, reject) => {
    const syncProcess = initializeSpawn(workingDir);

    syncProcess.on('error', (err) => {
      reject(err);
    });
    syncProcess.on('exit', async (err) => {
      if (!err) {
        const uri = await fs.readFile(`${workingDir}/minimap/minimap.png`);
        emitAction(socket, snapshotID, `data:image/png;base64,${uri.toString('base64')}`);
        await removeFile(workingDir);
        resolve();
      } else {
        reject(err);
      }
    });
  })
);

export default spawnProcess;
