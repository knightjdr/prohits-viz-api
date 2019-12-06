import archive from './archive.js';
import config from '../../../config/config.js';
import stat from './stat.js';

const downloadFolder = (req, res) => {
  const { folder } = req.params;
  const taskFolder = `${config.workDir}${folder}`;
  stat(taskFolder, res)
    .then(() => archive(taskFolder, res))
    .catch(() => {
      res.status(500);
      res.end();
    });
};

export default downloadFolder;
