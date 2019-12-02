const { MongoClient } = require('mongodb');
const config = require('../../config/config');

const initializeDatabase = async () => {
  const dbParams = `${config.database.user}:${config.database.pw}@localhost:27017/${config.database.name}`;
  const url = `mongodb://${dbParams}`;
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  return {
    client,
    db: client.db(config.database.name),
  };
};

module.exports = initializeDatabase;
