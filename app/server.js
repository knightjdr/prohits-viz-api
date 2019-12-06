import bodyparser from 'body-parser';
import compression from 'compression';
import express from 'express';
import http from 'http';

import clearFolders from './helpers/clear/clear-folders.js';
import config from './config/config.js';
import configureCORS from './config/configure-cors.js';
import configureSocket from './config/configure-socket.js';
import database from './helpers/database/database.js';
import logger from './helpers/logging/logger.js';
import setResponseHeaders from './config/set-response-headers.js';
import router from './routes/router.js';
import { isOriginAuthorized } from './config/authorized-origin.js';

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
