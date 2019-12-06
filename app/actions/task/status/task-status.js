import fs from 'fs';

import config from '../../../config/config.js';
import shouldResolve from './should-resolve.js';

const status = tasks => (
  new Promise((resolve) => {
    if (tasks.length === 0) {
      resolve({ list: [], status: [] });
    } else {
      const taskStatus = {
        list: [],
        status: [],
      };
      let checked = 0;
      tasks.forEach((task) => {
        fs.readFile(`${config.workDir}${task}/status.json`, 'utf8', (err, data) => {
          taskStatus.list.push(task);
          if (!err) {
            taskStatus.status.push({
              ...JSON.parse(data),
              id: task,
            });
          } else {
            taskStatus.status.push({
              date: '-',
              id: task,
              status: 'error',
            });
          }
          checked += 1;
          shouldResolve(checked, tasks.length, taskStatus, resolve);
        });
      });
    }
  })
);

export default status;
