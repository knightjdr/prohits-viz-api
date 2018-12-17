const bodyparser = require('body-parser');
const compression = require('compression');
const express = require('express');
const http = require('http');

const config = require('./config');
const corsSetup = require('./setup/cors');
const clearFolders = require('./app/modules/clear/clear-folders');
const database = require('./app/connections/database');
const logger = require('./logger');
const responseHeaders = require('./setup/response-headers');
const router = require('./app/routes/router');
const socketConfig = require('./setup/socket-config');
const { authorizedOrigin } = require('./setup/authorized-origin');

// Init app.
const initApp = () => {
  const app = express();
  const server = http.createServer(app);
  app.use(responseHeaders);
  app.use(corsSetup());
  app.use(authorizedOrigin);
  app.use(bodyparser.json({ limit: '100mb' }));
  app.use(compression());
  app.use(config.base, router);
  server.listen(config.port, () => {
    logger.info(`Server listening on port ${server.address().port}`);
  });
  socketConfig(app, server);
};

function init() {
  database.init()
    .then(() => {
      initApp();
    })
    .catch((err) => {
      logger.error(err);
    });
}

setInterval(clearFolders, config.clearDelay);

init();
