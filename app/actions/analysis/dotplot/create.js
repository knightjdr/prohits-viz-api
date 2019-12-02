const path = require('path');

const createDirs = require('../../../helpers/files/create-dir');
const createStatus = require('../../../helpers/status/create-status');
const deleteDirs = require('../../../helpers/files/delete-dir');
const getWorkDir = require('../../../helpers/files/create-work-dir');
const moveFiles = require('../../../helpers/files/move-files');
const spawnTask = require('./spawn');
const validateDotplot = require('./validate');
const updateStatus = require('../../../helpers/status/update-status');

/* This task will
**  1. Create a working directory
**  2a. Create a folder for storing uploaded files
**  2b. Create a file for writing the task status.
**  3. Move uploaded files to the folder
**  ** Resolve with the task ID.
**  4. Spawn the task
**  5a. Emit a response via socket that the user should check their task status.
**  5b. Delete the input file folder after the task is complete.
** */
const createDotplot = (req, res) => (
  new Promise((resolve) => {
    const { socket } = res.locals;
    const validatedForm = validateDotplot(req.body, req.files);
    const subDirs = ['files'];
    let taskID;
    let workDir;
    getWorkDir()
      .then((dir) => {
        taskID = path.basename(dir);
        workDir = dir;
        return Promise.all([
          createDirs(subDirs, workDir),
          createStatus(workDir, validatedForm),
        ]);
      })
      .then(() => {
        res.send({ id: taskID });
        return moveFiles(req.files, workDir, req.body.sampleFile);
      })
      .then(() => spawnTask(validatedForm, workDir))
      .then(() => Promise.all([
        updateStatus(workDir),
        deleteDirs(subDirs, workDir),
      ]))
      .then(() => {
        socket.emit('action', { type: 'SHOULD_UPDATE_TASKS' });
        resolve();
      })
      .catch(() => {
        res.status(500);
        res.end();
        resolve();
      });
  })
);

module.exports = createDotplot;
