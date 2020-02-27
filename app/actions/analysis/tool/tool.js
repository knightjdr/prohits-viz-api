import path from 'path';

import createDirs from '../../../helpers/files/create-dirs.js';
import createStatus from '../../../helpers/status/create-status.js';
import definePrimaryImageFile from './primary-image-file.js';
import deleteDirs from '../../../helpers/files/delete-dir.js';
import getWorkDir from '../../../helpers/files/create-work-dir.js';
import moveFiles from '../../../helpers/files/move-files.js';
import spawnTask from './spawn.js';
import updateStatus from '../../../helpers/status/update-status.js';
import validate from '../../../helpers/validation/analysis/validate.js';
import writeFile from '../../../helpers/files/write-file.js';

/* This function will
**  1. Validate form data
**  2. Create a working directory
**  ** send response with the task ID.
**  3a. Create a folder for storing uploaded files
**  3b. Create a file for writing the task status.
**  4a. Move uploaded files to the folder
**  4b. Create settings file for analysis.
**  5. Spawn the task
**  6a. Emit a response via socket that the user should check their task status.
**  6b. Delete the input file folder after the task is complete.
** */
const runToolAnalysis = async (req, res) => {
  try {
    const { socket } = res.locals;
    const { tool } = req.params;

    const { values: validatedForm, errors } = validate(tool, req.body, req.files);
    if (Object.keys(errors).length > 0) {
      res.status(422);
      res.send({ errors });
    } else {
      validatedForm.type = tool;
      validatedForm.files = req.files.map(file => `files/${file.originalname}`);

      const workDir = await getWorkDir();
      const taskID = path.basename(workDir);

      res.send({ id: taskID, tool });

      await Promise.all([
        createDirs(workDir, ['files']),
        createStatus(workDir, tool, definePrimaryImageFile(tool, validatedForm)),
      ]);

      await Promise.all([
        moveFiles(req.files, workDir, validatedForm.sampleFile),
        writeFile(`${workDir}/settings.json`, JSON.stringify(validatedForm, null, 2)),
      ]);

      await spawnTask(workDir);
      const [status] = await Promise.all([
        updateStatus(workDir),
        deleteDirs(workDir, ['files']),
      ]);

      socket.emit(
        'action',
        {
          id: taskID,
          status,
          type: 'UPDATE_TASK_STATUS',
        },
      );
    }
  } catch (error) {
    res.status(500);
    res.end();
  }
};

export default runToolAnalysis;
