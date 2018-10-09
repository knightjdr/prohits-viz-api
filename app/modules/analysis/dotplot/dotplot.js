const createDirs = require('../files/create-dir');
const createStatus = require('../status/create-status');
const deleteDirs = require('../files/delete-dir');
const getWorkDir = require('../../helpers/work-dir');
const moveFiles = require('../files/move-files');
const path = require('path');
const spawnTask = require('./spawn');
const updateStatus = require('../status/update-status');

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
const dotplot = (req, res) => (
  new Promise((resolve) => {
    const { socket } = res.locals;
    const validatedForm = {}; // convertToForm(validateGo(req.body));
    const subDirs = ['files'];
    let taskID;
    let workDir;
    getWorkDir()
      .then((dir) => {
        taskID = path.basename(dir);
        workDir = dir;
        return Promise.all([
          createDirs(subDirs, workDir),
          createStatus(workDir, req.body),
        ]);
      })
      .then(() => {
        res.send({ id: taskID });
        return moveFiles(req.files, workDir);
      })
      .then(() => spawnTask(validatedForm, socket))
      .then(() => Promise.all([
        updateStatus(workDir, validatedForm, socket),
        deleteDirs(subDirs, workDir),
      ]))
      .then(() => {
        resolve();
      })
      .catch(() => {
        res.status(500);
        res.end();
        resolve();
      });
  })
);

module.exports = dotplot;
