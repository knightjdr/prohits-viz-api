import config from '../../../config/config.js';
import exists from '../../../helpers/download/exists.js';
import getSubDirectory from './get-sub-directory.js';
import readStream from '../../../helpers/download/read-stream.js';

const downloadTaskFile = async (req, res) => {
  try {
    const { filename, folder } = req.params;
    const { file, subDirectory } = getSubDirectory(filename);
    const completeFilePath = `${config.workDir}${folder}${subDirectory}/${file}`;
    await exists(completeFilePath, res);
    await readStream(completeFilePath, res);
  } catch (error) {
    res.status(500);
    res.end();
  }
};

export default downloadTaskFile;
