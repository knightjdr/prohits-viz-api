import { promises as fs } from 'fs';

import config from '../../../config/config.js';

const getStatus = async (tasks) => {
  if (tasks.length === 0) {
    return {};
  }

  const settled = await Promise.allSettled(
    tasks.map(async task => fs.readFile(`${config.workDir}${task}/status.json`, 'utf8')),
  );
  return settled.reduce((accum, task, index) => {
    if (task.status === 'fulfilled') {
      return {
        ...accum,
        [tasks[index]]: JSON.parse(task.value),
      };
    }
    return accum;
  }, {});
};

export default getStatus;
