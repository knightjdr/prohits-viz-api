import constructJSON from '../../helpers/export/construct-json.js';
import spawnProcess from './spawn.js';
import validate from '../../helpers/validation/validate.js';
import writeDataFile from '../../helpers/export/write-data-file.js';
import createWorkDir from '../../helpers/files/create-work-dir.js';

const sync = async (req, res) => {
  const { socket } = res.locals;
  const { snapshotID } = req.params;
  res.send({});

  try {
    const validated = validate(req.body.imageType, req.body);
    const json = constructJSON(validated);
    const workingDir = await createWorkDir();
    await writeDataFile(workingDir, json);
    await spawnProcess(socket, workingDir, snapshotID);
  } catch (error) {
    socket.emit('action', { snapshotID, type: 'SYNC_ERROR' });
  }
};

export default sync;
