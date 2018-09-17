const get = require('./routes-get');
const messages = require('./route-messages');
const post = require('./routes-post');

const routes = {
  configure: (app) => {
    get(app);
    post(app);
    app.use((req, res) => {
      res.status(405).send({
        message: messages.notSupported,
      });
    });
  },
};

module.exports = routes;
