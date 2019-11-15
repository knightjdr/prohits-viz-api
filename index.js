const bodyparser = require('body-parser');
const compression = require('compression');
const express = require('express');
const http = require('http');

const clearFolders = require('./app/modules/clear/clear-folders');
const config = require('./config');
const configureCORS = require('./setup/configure-cors');
const configureSocket = require('./setup/configure-socket');
const database = require('./app/connections/database');
const logger = require('./logger');
const setResponseHeaders = require('./setup/set-response-headers');
const router = require('./app/routes/router');
const { isOriginAuthorized } = require('./setup/authorized-origin');

const initApp = () => {
  const app = express();
  const server = http.createServer(app);
  app.use(setResponseHeaders);
  app.use(configureCORS());
  app.use(isOriginAuthorized);
  app.use(bodyparser.json({ limit: '100mb' }));
  app.use(compression());
  app.use(config.base, router);
  server.listen(config.port, () => {
    logger.info(`Server listening on port ${server.address().port}`);
  });
  configureSocket(app, server);
};

const main = async () => {
  try {
    await database.init();
    initApp();
  } catch (error) {
    logger.error(error);
  }
};

setInterval(clearFolders, config.clearDelay);

main();
