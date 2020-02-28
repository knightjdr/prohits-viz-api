import archive from './archive.js';
import config from '../../../config/config.js';
import stat from './stat.js';

const downloadFolder = async (req, res) => {
  try {
    const { folder } = req.params;
    const taskFolder = `${config.workDir}${folder}`;
    await stat(taskFolder, res);
    archive(taskFolder, res);
  } catch (error) {
    res.status(500);
    res.end();
  }
};

export default downloadFolder;
