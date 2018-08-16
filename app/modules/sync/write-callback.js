const spawnProcess = require('./spawn');

const writeCallback = (err, socket, workingDir) => {
  if (!err) {
    spawnProcess(socket, workingDir);
  } else {
    socket.emit('action', { type: 'SYNC_ERROR' });
  }
};

module.exports = writeCallback;
