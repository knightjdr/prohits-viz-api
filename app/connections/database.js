const init = require('./init');

const database = {
  client: null,
  close: async () => {
    if (database.connection) {
      await database.client.close();
      database.client = null;
      database.connection = null;
    }
  },
  connection: null,
  init: async () => {
    const initialization = await init();
    database.client = initialization.client;
    database.connection = initialization.db;
  },
};

module.exports = database;
