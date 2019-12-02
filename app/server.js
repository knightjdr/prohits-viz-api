const bodyparser = require('body-parser');
const compression = require('compression');
const express = require('express');
const http = require('http');

const clearFolders = require('./helpers/clear/clear-folders');
const config = require('./config/config');
const configureCORS = require('./config/configure-cors');
const configureSocket = require('./config/configure-socket');
const database = require('./helpers/database/database');
const logger = require('./helpers/logging/logger');
const setResponseHeaders = require('./config/set-response-headers');
const router = require('./routes/router');
const { isOriginAuthorized } = require('./config/authorized-origin');

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
