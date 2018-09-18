const analysis = require('../modules/analysis/analysis');
const exportImage = require('../modules/export/export');
const getSocket = require('../middleware/get-socket');
const messages = require('./route-messages');
const sync = require('../modules/sync/sync');

const post = (router) => {
  router.post('/analysis/viz/:type', getSocket, analysis);
  router.post('/export/:type', getSocket, exportImage);
  router.post('/sync/', getSocket, sync);
  router.post('*', (req, res) => {
    res.status(404).send({ message: messages.invalidRoute });
  });
};

module.exports = post;
