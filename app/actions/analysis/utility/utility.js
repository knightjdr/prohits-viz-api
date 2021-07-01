import path from 'path';

import createCommand from './create-command.js';
import createDirs from '../../../helpers/files/create-dirs.js';
import createStatus from '../../../helpers/status/create-status.js';
import deleteDirs from '../../../helpers/files/delete-dir.js';
import getWorkDir from '../../../helpers/files/create-work-dir.js';
import moveFiles from '../../../helpers/files/move-files.js';
import spawnProcess from './spawn.js';
import validate from './validation/validate.js';

/* This function will
**  1. Validate form data
**  2. Create a working directory
**  3. send response with the task ID.
**  4a. Create a folder for storing uploaded files
**  4b. Create a file for writing the task status.
**  5. Move uploaded files to the folder
**  6. Spawn the task
**  7a. Emit a response via socket that the task is complete.
**  7b. Delete the input file folder after the task is complete.
** */
const runUtilityAnalysis = async (req, res) => {
  try {
    const { socket } = res.locals;
    const { tool } = req.params;

    const { fields, errors } = validate(req.body, req.files.file);
    if (Object.keys(errors).length > 0) {
      res.status(422);
      res.send({ errors });
    } else {
      fields.files = req.files.file.map(file => `files/${file.originalname}`);

      const workDir = await getWorkDir();
      const taskID = path.basename(workDir);

      res.send({ id: taskID, tool });

      await Promise.all([
        createDirs(workDir, ['files']),
        createStatus(workDir, { tool }),
      ]);

      await moveFiles(req.files.file, `${workDir}/files`);

      const script = createCommand(fields);
      const error = await spawnProcess(script, workDir);

      const [status] = await Promise.all([
        createStatus(
          workDir,
          {
            status: error ? 'error' : 'complete',
            tool,
          },
        ),
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

export default runUtilityAnalysis;
