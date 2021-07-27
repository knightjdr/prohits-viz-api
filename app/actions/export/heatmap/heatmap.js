import config from '../../../config/config.js';
import constructJSON from '../../../helpers/export/construct-json.js';
import createWorkDir from '../../../helpers/files/create-work-dir.js';
import logger from '../../../helpers/logging/logger.js';
import spawnProcess from './spawn.js';
import validate from '../../../helpers/validation/viz/validate.js';
import writeDataFile from '../../../helpers/export/write-data-file.js';

const heatmap = async (req, res) => {
  const { socket } = res.locals;
  res.send({});

  try {
    const { format, imageType } = req.body;
    const validated = validate(req.body.imageType, req.body);
    const json = constructJSON(validated);
    const workingDir = await createWorkDir();
    await writeDataFile(workingDir, json);

    const options = {
      font: config.exportFont,
      format,
      imageType,
      targetFile: `${workingDir.replace('tmp/', '')}/${format}/${imageType}.${format}`,
      workingDir,
    };
    await spawnProcess(socket, options);
  } catch (error) {
    logger.error(`export - ${error.toString()}`);
    socket.emit('action', { type: 'EXPORT_ERROR' });
  }
};

export default heatmap;
