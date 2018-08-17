const analysis = require('./modules/analysis/analysis');
const HomeLoad = require('./modules/home-load/home-load');
const getSocket = require('./middleware/get-socket');
const News = require('./modules/news/news');
const sync = require('./modules/sync/sync');

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
    // GO analysis.
    app.post('/api/analysis/viz/go', getSocket, (req, res) => {
      analysis.go(res.locals.socket, req.body)
        .then((response) => {
          Routes.response(res, response);
        });
    });

    // Sync minimap.
    app.post('/api/sync/', getSocket, (req, res) => {
      sync(res.locals.socket, req.body)
        .then((response) => {
          Routes.response(res, response);
        });
    });

    // Invalid post routes.
    app.post('*', (req, res) => {
      res.status(404).send({
        message: Routes.messages.invalidRoute,
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
