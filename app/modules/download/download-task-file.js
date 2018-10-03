const config = require('../../../config');
const exists = require('./exists');
const readStream = require('./read-stream');

const subFolder = (filename) => {
  switch (filename) {
    case 'error':
      return {
        file: 'error.txt',
        subDir: '',
      };
    case 'log':
      return {
        file: 'log.txt',
        subDir: '',
      };
    default:
      return {
        file: `${filename}.json`,
        subDir: '/interactive',
      };
  }
};

/* downloadFile will take the working directory and file specified by the request
** and check to see if a file exists in the appropriate directory for that task.
** If so, it will then stream the specified file for download back to the client. */
const downloadTaskFile = (req, res) => {
  const { filename, folder } = req.params;
  const { file, subDir } = subFolder(filename);
  const workDir = `${config.workDir}${folder}${subDir}`;
  exists(`${workDir}/${file}`, res)
    .then(() => readStream(workDir, file, res))
    .catch(() => {
      res.status(500);
      res.end();
    });
};

module.exports = downloadTaskFile;
