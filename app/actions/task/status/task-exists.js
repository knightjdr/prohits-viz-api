import { promises as fs } from 'fs';

import config from '../../../config/config.js';

const exists = async (tasks) => {
  const settled = await Promise.allSettled(
    tasks.map(async task => fs.stat(`${config.workDir}${task}`)),
  );
  return tasks.filter((task, index) => settled[index].status === 'fulfilled');
};

export default exists;
