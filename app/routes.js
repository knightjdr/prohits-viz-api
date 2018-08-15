const HomeLoad = require('./modules/home-load/home-load');
const News = require('./modules/news/news');
const Sync = require('./modules/sync/sync');

const Routes = {
  configure: (app) => {
    /* GET */
    // Get all content for home page.
    app.get('/api/home/', (req, res) => {
      HomeLoad()
        .then((response) => {
          Routes.response(res, response);
        });
    });
    // Get news.
    app.get('/api/news/', (req, res) => {
      News()
        .then((response) => {
          Routes.response(res, response);
        });
    });
    app.get('/api/news/:newsId', (req, res) => {
      News(req.params.newsId)
        .then((response) => {
          Routes.response(res, response);
        });
    });
    // Invalid get methods.
    app.get('*', (req, res) => {
      res.status(404).send({
        message: Routes.messages.invalidRoute,
      });
    });

    /* POST */
    app.post('/api/sync/', (req, res) => {
      Sync(req.app.get('socketio'), req.body)
        .then((response) => {
          Routes.response(res, response);
        });
    });
    // For invalid methods.
    app.use((req, res) => {
      res.status(405).send({
        message: Routes.messages.notSupported,
      });
    });
  },
  messages: {
    invalidRoute: 'The requested route is not valid',
    notSupported: 'The requested method is not supported',
  },
  response: (resObject, response) => {
    // security headers
    resObject.setHeader('X-XSS-Protection', '1;mode=block');
    resObject.setHeader('X-Frame-Options', 'SAMEORIGIN');
    resObject.setHeader('X-Content-Type-Options', 'nosniff');
    resObject.status(response.status).send(response.data);
  },
};
module.exports = Routes;
