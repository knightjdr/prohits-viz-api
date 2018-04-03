const bodyparser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');

const Config = require('./config');
const Database = require('./app/connections/database');
const Logger = require('./logger');
const Routes = require('./app/routes');

//  init app
const initApp = () => {
  const app = express();
  const server = http.createServer(app);
  app.use(cors());
  app.use(bodyparser.json({ limit: '1000mb' }));
  Routes.configure(app);
  // start server
  server.listen(Config.port, () => {
    Logger.info(`Server listening on port ${server.address().port}`);
  });
};

async function init() {
  // init database
  const db = await Database.init();
  // if there is an error log it, otherwise init app
  if (db instanceof Error) {
    Logger.error(db);
  } else {
    initApp();
  }
}

init();
