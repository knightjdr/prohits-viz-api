import config from '../../../config/config.js';
import exists from '../../../helpers/download/exists.js';
import getSubDirectory from './get-sub-directory.js';
import readStream from '../../../helpers/download/read-stream.js';

const downloadTaskFile = (req, res) => {
  const { filename, folder } = req.params;
  const { file, subDirectory } = getSubDirectory(filename);
  const workDir = `${config.workDir}${folder}${subDirectory}`;
  exists(`${workDir}/${file}`, res)
    .then(() => readStream(workDir, file, res))
    .catch(() => {
      res.status(500);
      res.end();
    });
};

export default downloadTaskFile;
