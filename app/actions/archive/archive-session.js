import fs from 'fs/promises';

import config from '../../config/config.js';
import createArchiveID from './create-id.js';
import logger from '../../helpers/logging/logger.js';
import updateTaskParameters from './update-task-parameters.js';

const archiveSession = async (req, res) => {
  try {
    const archiveID = createArchiveID();
    const data = updateTaskParameters(req.body, archiveID);
    await fs.writeFile(
      `${config.archiveDir}${archiveID}.json`,
      JSON.stringify(data),
    );
    res.send({ route: `/visualization/archive/${archiveID}` });
  } catch (error) {
    logger.error(`archiving - ${error.toString()}`);
    res.status(500);
    res.end();
  }
};

export default archiveSession;
