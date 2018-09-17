const analysis = require('../modules/analysis/analysis');
const getSocket = require('../middleware/get-socket');
const messages = require('./route-messages');
const sync = require('../modules/sync/sync');


const post = (app) => {
  app.post('/api/analysis/viz/go', getSocket, analysis.go);
  app.post('/api/sync/', getSocket, sync);
  app.post('*', (req, res) => {
    res.status(404).send({ message: messages.invalidRoute });
  });
};

module.exports = post;
