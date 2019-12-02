const archive = require('./archive');
const config = require('../../../config/config');
const stat = require('./stat');

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

module.exports = downloadFolder;
