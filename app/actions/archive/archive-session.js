import fs from 'fs/promises';

import config from '../../config/config.js';
import createArchiveID from './create-id.js';
import updateTaskID from './update-task-id.js';

const archiveSession = async (req, res) => {
  try {
    const archiveID = createArchiveID();
    const data = updateTaskID(req.body);
    await fs.writeFile(
      `${config.archiveDir}${archiveID}.json`,
      JSON.stringify(data),
    );
    res.send({ route: `/visualization/archive/${archiveID}` });
  } catch (error) {
    res.status(500);
    res.end();
  }
};

export default archiveSession;
