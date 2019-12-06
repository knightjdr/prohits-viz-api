import config from '../../config/config.js';
import exists from '../../helpers/download/exists.js';
import readFile from './read-file.js';
import readStream from '../../helpers/download/read-stream.js';

/* downloadFile will take the working directory specified by the request
** and check to see if a file with download instructions exists in that
** folder. If so, it will then stream the specified file for download back to the
** client. */
const downloadFile = (req, res) => {
  const { folder } = req.params;
  const downloadInfoFile = `${config.workDir}${folder}/download.txt`;
  exists(downloadInfoFile, res)
    .then(() => readFile(downloadInfoFile, 'utf8'))
    .then(targetFile => readStream(`${config.workDir}${folder}`, targetFile, res, true))
    .catch(() => {
      res.status(500);
      res.end();
    });
};

export default downloadFile;
