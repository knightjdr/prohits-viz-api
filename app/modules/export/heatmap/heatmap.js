const mkdir = require('../mkdir');
const spawnProcess = require('./spawn');
const validate = require('../../validation/validate');
const writeDataFile = require('../write-data-file');
const writeDownloadFile = require('../write-download-file');
const workDir = require('../../helpers/work-dir');

/* Generate a heatmap or dotplot for a data set. First, a working directory
** is created, and then sub directories for storing generated images, a file
** that specifies the location of the ultimate file the user wants to download
** and the data is written to a file for access by the GO script. */
const heatmap = (req, res) => {
  const { outputType } = req.body;
  const { socket } = res.locals;
  const validated = validate(req.body.imageType, req.body);
  if (validated.err) {
    res.status(400).send({ message: validated.err.toString() });
  } else {
    res.end();
    let workingDir;
    workDir()
      .then((dir) => {
        workingDir = dir;
        return Promise.all([
          mkdir(workingDir, [...new Set(['svg', outputType])]),
          writeDataFile(workingDir, validated.data),
          writeDownloadFile(workingDir, validated.data.imageType, outputType),
        ]);
      })
      .then(() => spawnProcess(socket, workingDir, outputType))
      .catch(() => {
        socket.emit('action', { type: 'SAVE_ERROR' });
      });
  }
};

module.exports = heatmap;