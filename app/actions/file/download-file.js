import config from '../../config/config.js';
import exists from '../../helpers/download/exists.js';
import logger from '../../helpers/logging/logger.js';
import readStream from '../../helpers/download/read-stream.js';

const downloadFile = async (req, res) => {
  try {
    const { file } = req.params;
    const completeFilePath = `${config.workDir}${file}`;
    await exists(completeFilePath, res);
    readStream(completeFilePath, res, true);
  } catch (error) {
    logger.error(`download file - ${error.toString()}`);
    res.status(500);
    res.end();
  }
};

export default downloadFile;
