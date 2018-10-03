const fs = require('fs');

const config = require('../../../config');
const shouldResolve = require('./should-resolve');

const exists = tasks => (
  new Promise((resolve) => {
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
  })
);

module.exports = exists;
