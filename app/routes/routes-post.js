const analysis = require('../modules/analysis/analysis');
const config = require('../../config');
const exportImage = require('../modules/export/export');
const getSocket = require('../middleware/get-socket');
const logTasks = require('../middleware/log-tasks');
const messages = require('./route-messages');
const multer = require('multer');
const noCacheClient = require('../middleware/no-cache');
const sync = require('../modules/sync/sync');
const task = require('../modules/task/task');
const thirdPartyViz = require('../modules/third-party/viz/viz');

const upload = multer({ dest: config.upload });

const post = (router) => {
  router.post('/analysis/viz/:type', getSocket, logTasks, analysis);
  router.post('/analysis/:type', upload.array('file'), getSocket, logTasks, analysis);
  router.post('/export/:type', getSocket, exportImage);
  router.post('/sync/:dataID', noCacheClient, getSocket, sync);
  router.post('/task/', task);
  router.post('/third-party/viz', logTasks, thirdPartyViz);
  router.post('*', (req, res) => {
    res.status(404).send({ message: messages.invalidRoute });
  });
};

module.exports = post;
