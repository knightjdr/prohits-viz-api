const createDirectories = require('../../helpers/files/create-dirs');
const spawnProcess = require('./spawn');
const validate = require('../../helpers/validation/validate');
const writeDataFile = require('../../helpers/export/write-data-file');
const createWorkDir = require('../../helpers/files/create-work-dir');

const sync = async (req, res) => {
  const { socket } = res.locals;
  const { snapshotID } = req.params;
  res.send({});

  try {
    const validated = validate(req.body.imageType, req.body, ['columns']);
    const workingDir = await createWorkDir();
    await Promise.all([
      createDirectories(workingDir, ['minimap']),
      writeDataFile(workingDir, validated),
    ]);
    await spawnProcess(socket, workingDir, snapshotID);
  } catch (error) {
    socket.emit('action', { snapshotID, type: 'SYNC_ERROR' });
  }
};

module.exports = sync;
