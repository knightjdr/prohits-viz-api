const config = require('../../../config');
const exists = require('./exists');
const readFile = require('./read-file');
const readStream = require('./read-stream');

/* downloadFile will take the working directory specified by the request
** and check to see if a file with download instructions exists in that
** folder. If so, it will then stream the specified file for download back to the
** client. */
const downloadFile = (req, res) => {
  const { folder } = req.params;
  const downloadInfoFile = `${config.workDir}${folder}/download.txt`;
  exists(downloadInfoFile)
    .then(() => readFile(downloadInfoFile, 'utf8'))
    .then(targetFile => readStream(`${config.workDir}${folder}`, targetFile, res))
    .catch(() => {
      res.status(500);
      res.end();
    });
};

module.exports = downloadFile;
