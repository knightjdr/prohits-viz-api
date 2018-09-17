const bodyparser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');

const config = require('./config');
const database = require('./app/connections/database');
const logger = require('./logger');
const responseHeaders = require('./setup/response-headers');
const routes = require('./app/routes/routes');
const socketConfig = require('./setup/socket-config');

// Init app.
const initApp = () => {
  const app = express();
  const server = http.createServer(app);
  app.use(responseHeaders);
  app.use(cors());
  app.use(bodyparser.json({ limit: '100mb' }));
  routes.configure(app);
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

init();
