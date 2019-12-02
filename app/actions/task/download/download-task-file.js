const config = require('../../../config/config');
const exists = require('../../../helpers/download/exists');
const getSubDirectory = require('./get-sub-directory');
const readStream = require('../../../helpers/download/read-stream');

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

module.exports = downloadTaskFile;
