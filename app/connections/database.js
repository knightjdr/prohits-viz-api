const Init = require('./init');
const Logger = require('../../logger');

// initialize database when class is first requried
const Database = {
  client: null,
  close: () => (
    new Promise((resolve, reject) => {
      if (Database.connection) {
        Database.client.close()
          .then(() => {
            Database.client = null;
            Database.connection = null;
            Logger.info('database connection closed');
            resolve();
          })
          .catch((err) => {
            Logger.error(err);
            reject();
          });
      }
      resolve();
    })
  ),
  connection: null,
  init: () => (
    new Promise((resolve, reject) => {
      Init()
        .then((initObj) => {
          Database.client = initObj.client;
          Database.connection = initObj.db;
          resolve();
        })
        .catch((err) => {
          Logger.error(err);
          reject(err);
        });
    })
  ),
};
module.exports = Database;
