const checkStatus = require('./check-status');
const overwriteStatus = require('./overwrite-status');

const writeStatus = (workDir, status, files, socket) => (
  new Promise((resolve, reject) => {
    checkStatus(workDir)
      .then((json) => {
        const newStatus = {
          ...json,
          files,
          status,
        };
        return overwriteStatus(workDir, newStatus);
      })
      .then(() => {
        socket.emit('action', { type: 'SHOULD_UPDATE_TASKS' });
        resolve();
      })
      .catch(() => {
        socket.emit('action', { type: 'SHOULD_UPDATE_TASKS' });
        reject();
      });
  })
);

module.exports = writeStatus;
