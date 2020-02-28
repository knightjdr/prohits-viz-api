import exists from './task-exists.js';
import status from './task-status.js';

/* Get status of specified tasks. First checks
** to make sure task folder exists, then grabs the
** status file. */
const updateStatus = async (req, res) => {
  try {
    const { tasks } = req.params;
    const folders = await exists(tasks.split(';'));
    const taskStatus = await status(folders);
    res.send({ tasks: taskStatus });
  } catch (error) {
    res.status(500);
    res.end();
  }
};

export default updateStatus;
