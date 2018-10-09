const analysis = require('../modules/analysis/analysis');
const config = require('../../config');
const exportImage = require('../modules/export/export');
const getSocket = require('../middleware/get-socket');
const messages = require('./route-messages');
const multer = require('multer');
const sync = require('../modules/sync/sync');
const task = require('../modules/task/task');

const upload = multer({ dest: config.upload });

const post = (router) => {
  router.post('/analysis/viz/:type', getSocket, analysis);
  router.post('/analysis/:type', upload.array('file'), getSocket, analysis);
  router.post('/export/:type', getSocket, exportImage);
  router.post('/sync/', getSocket, sync);
  router.post('/task/', task);
  router.post('*', (req, res) => {
    res.status(404).send({ message: messages.invalidRoute });
  });
};

module.exports = post;
