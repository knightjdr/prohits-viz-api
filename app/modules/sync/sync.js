const mkdir = require('../export/mkdir');
const spawnProcess = require('./spawn');
const validate = require('../validation/validate');
const writeDataFile = require('../export/write-data-file');
const workDir = require('../helpers/work-dir');

// Generate a minimap for a data set.
const sync = async (req, res) => {
  const { socket } = res.locals;
  const { dataID } = req.params;
  try {
    const validated = validate(req.body.imageType, req.body, ['columns']);
    if (validated.err) {
      res.status(400);
      res.send({ message: validated.err.toString() });
    } else {
      res.send({});
      const workingDir = await workDir();
      await Promise.all([
        mkdir(workingDir, ['minimap']),
        writeDataFile(workingDir, validated.data),
      ]);
      await spawnProcess(socket, workingDir, dataID);
    }
  } catch (error) {
    socket.emit('action', { dataID, type: 'SYNC_ERROR' });
  }
};

module.exports = sync;
