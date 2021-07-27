import fs from 'fs/promises';
import path from 'path';

import cleanup from './cleanup.js';
import createDirs from '../../../helpers/files/create-dirs.js';
import createStatus from '../../../helpers/status/create-status.js';
import definePrimaryImageFile from './primary-image-file.js';
import defineUserIndependentSettings from './define-user-independent-settings.js';
import getWorkDir from '../../../helpers/files/create-work-dir.js';
import logger from '../../../helpers/logging/logger.js';
import moveFiles from '../../../helpers/files/move-files.js';
import spawnTask from './spawn.js';
import updateStatus from '../../../helpers/status/update-status.js';
import validate from '../../../helpers/validation/analysis/validate.js';

/* This function will
**  1. Validate form data
**  1b. Augment validated form
**  2. Create a working directory
**  3. send response with the task ID.
**  4a. Create a folder for storing uploaded files
**  4b. Create a file for writing the task status.
**  5a. Move uploaded files to the folder
**  5b. Create settings file for analysis.
**  6. Spawn the task
**  7a. Emit a response via socket that the task is complete.
**  7b. Delete the input file folder after the task is complete.
** */
const runToolAnalysis = async (req, res) => {
  try {
    const { socket } = res.locals;
    const { tool } = req.params;

    const { values: validatedForm, errors } = validate(tool, req.body, req.files.file);
    if (Object.keys(errors).length > 0) {
      res.status(422);
      res.send({ errors });
    } else {
      validatedForm.type = tool;
      validatedForm.files = req.files.file.map(file => `files/${file.originalname}`);
      validatedForm.helperFiles = req.files.helperFile?.map(file => `helper-files/${file.originalname}`);

      const workDir = await getWorkDir();
      const taskID = path.basename(workDir);

      res.send({ id: taskID, tool });

      await Promise.all([
        createDirs(workDir, ['files', 'helper-files']),
        createStatus(workDir, { tool, primaryFile: definePrimaryImageFile(tool, validatedForm) }),
      ]);

      const additionalSettings = await defineUserIndependentSettings(validatedForm, workDir);

      await Promise.all([
        moveFiles(req.files.file, `${workDir}/files`, validatedForm.sampleFile),
        moveFiles(req.files.helperFile, `${workDir}/helper-files`),
        fs.writeFile(
          `${workDir}/settings.json`,
          JSON.stringify({ ...validatedForm, ...additionalSettings }, null, 2),
        ),
      ]);

      await spawnTask(workDir);
      const [status] = await Promise.all([
        updateStatus(workDir),
        cleanup(workDir, tool),
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
    logger.error(`primary analysis - ${error.toString()}`);
    res.status(500);
    res.end();
  }
};

export default runToolAnalysis;
