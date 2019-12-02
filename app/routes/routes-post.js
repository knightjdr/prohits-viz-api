const multer = require('multer');

const config = require('../config/config');
const getSocket = require('./middleware/get-socket');
const logTasks = require('./middleware/log-tasks');
const messages = require('./route-messages');
const noCacheClient = require('./middleware/no-cache');

const analysis = require('../actions/analysis/analysis');
const exportImage = require('../actions/export/export');
const handleVizFile = require('../actions/third-party/viz/handle-viz-file');
const sync = require('../actions/sync/sync');
const updateStatus = require('../actions/task/status/update-status');

const upload = multer({ dest: config.upload });

const post = (router) => {
  router.post('/analysis/viz/:type', getSocket, logTasks, analysis);
  router.post('/analysis/:type', upload.array('file'), getSocket, logTasks, analysis);
  router.post('/export/:type', getSocket, exportImage);
  router.post('/sync/:snapshotID', noCacheClient, getSocket, sync);
  router.post('/task/', updateStatus);
  router.post('/third-party/viz', logTasks, handleVizFile);
  router.post('*', (req, res) => {
    res.status(404).send({ message: messages.invalidRoute });
  });
};

module.exports = post;
