const fs = require('fs');

const config = require('../../../config/config');
const shouldResolve = require('./should-resolve');

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

module.exports = exists;
