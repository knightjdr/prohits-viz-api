import path from 'path';

import createDirs from '../../../helpers/files/create-dirs.js';
import createStatus from '../../../helpers/status/create-status.js';
import deleteDirs from '../../../helpers/files/delete-dir.js';
import getWorkDir from '../../../helpers/files/create-work-dir.js';
import moveFiles from '../../../helpers/files/move-files.js';
import spawnTask from './spawn.js';
import validateDotplot from './validate.js';
import updateStatus from '../../../helpers/status/update-status.js';

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
const createDotplot = async (req, res) => {
  try {
    const { socket } = res.locals;
    const validatedForm = validateDotplot(req.body, req.files);
    console.log(validatedForm);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.end();
  }
};
  /* new Promise((resolve) => {
    const { socket } = res.locals;
    
    const subDirs = ['files'];
    let taskID;
    let workDir;
    getWorkDir()
      .then((dir) => {
        taskID = path.basename(dir);
        workDir = dir;
        return Promise.all([
          createDirs(workDir, subDirs),
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
        deleteDirs(workDir, subDirs),
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
  }) */

export default createDotplot;
