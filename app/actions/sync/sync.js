const mkdir = require('../../helpers/export/mkdir');
const spawnProcess = require('./spawn');
const validate = require('../../helpers/validation/validate');
const writeDataFile = require('../../helpers/export/write-data-file');
const createWorkDir = require('../../helpers/files/create-work-dir');

const sync = async (req, res) => {
  const { socket } = res.locals;
  const { snapshotID } = req.params;
  try {
    const validated = validate(req.body.imageType, req.body, ['columns']);
    if (validated.err) {
      res.status(400);
      res.send({ message: validated.err.toString() });
    } else {
      res.send({});
      const workingDir = await createWorkDir();
      await Promise.all([
        mkdir(workingDir, ['minimap']),
        writeDataFile(workingDir, validated.data),
      ]);
      await spawnProcess(socket, workingDir, snapshotID);
    }
  } catch (error) {
    socket.emit('action', { snapshotID, type: 'SYNC_ERROR' });
  }
};

module.exports = sync;
