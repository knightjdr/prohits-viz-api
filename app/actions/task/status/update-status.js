const arrSortByKey = require('../../../utils/arr-sort-by-key');
const exists = require('./task-exists');
const status = require('./task-status');

/* Get status of specified tasks. First checks
** to make sure task folder exists, then grabs the
** status file. */
const updateStatus = (req, res) => {
  const { tasks } = req.body;
  exists(tasks)
    .then(folders => status(folders))
    .then((taskStatus) => {
      res.send({
        list: taskStatus.list,
        status: arrSortByKey(taskStatus.status, 'date', 'des'),
      });
    })
    .catch(() => {
      res.status(500);
      res.end();
    });
};

module.exports = updateStatus;
