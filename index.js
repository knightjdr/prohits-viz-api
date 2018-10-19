const bodyparser = require('body-parser');
const express = require('express');
const http = require('http');

const authorizedOrigin = require('./setup/authorized-origin');
const config = require('./config');
const corsSetup = require('./setup/cors');
const clearFolders = require('./app/modules/clear/clear-folders');
const database = require('./app/connections/database');
const logger = require('./logger');
const responseHeaders = require('./setup/response-headers');
const router = require('./app/routes/router');
const socketConfig = require('./setup/socket-config');

// Init app.
const initApp = () => {
  const app = express();
  const server = http.createServer(app);
  app.use(responseHeaders);
  app.use(corsSetup());
  app.use(authorizedOrigin);
  app.use(bodyparser.json({ limit: '100mb' }));
  app.use('/api', router);
  server.listen(config.port, () => {
    logger.info(`Server listening on port ${server.address().port}`);
  });
  socketConfig(app, server);
};

async function init() {
  // Init database.
  const db = await database.init();
  // If there is an error log it, otherwise init app.
  if (db instanceof Error) {
    logger.error(db);
  } else {
    initApp();
  }
}

setInterval(clearFolders, config.clearDelay);

init();
