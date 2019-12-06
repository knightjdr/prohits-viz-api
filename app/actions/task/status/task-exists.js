import fs from 'fs';

import config from '../../../config/config.js';
import shouldResolve from './should-resolve.js';

const exists = tasks => (
  new Promise((resolve) => {
    const keepTasks = [];
    let checked = 0;
    tasks.forEach((task) => {
      fs.stat(`${config.workDir}${task}`, (err) => {
        if (!err) {
          keepTasks.push(task);
        }
        checked += 1;
        shouldResolve(checked, tasks.length, keepTasks, resolve);
      });
    });
  })
);

export default exists;
