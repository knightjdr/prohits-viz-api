const archive = require('./archive');
const config = require('../../../config');
const stat = require('./stat');

/* downloadFolder will take the working directory specified by the request,
** zip it and stream the specified it back to the client. */
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
