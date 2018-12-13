const mkdir = require('../export/mkdir');
const spawnProcess = require('./spawn');
const validate = require('../validation/validate');
const writeDataFile = require('../export/write-data-file');
const workDir = require('../helpers/work-dir');

// Generate a minimap for a data set.
const sync = (req, res) => {
  const { socket } = res.locals;
  const validated = validate(req.body.imageType, req.body, ['columns']);
  if (validated.err) {
    res.status(400);
    res.send({ message: validated.err.toString() });
  } else {
    res.end();
    let workingDir;
    workDir()
      .then((dir) => {
        workingDir = dir;
        return Promise.all([
          mkdir(workingDir, ['minimap']),
          writeDataFile(workingDir, validated.data),
        ]);
      })
      .then(() => spawnProcess(socket, workingDir))
      .catch(() => {
        socket.emit('action', { type: 'SYNC_ERROR' });
      });
  }
};

module.exports = sync;
