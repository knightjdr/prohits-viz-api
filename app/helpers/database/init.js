import mongodb from 'mongodb';

import config from '../../config/config.js';

const { MongoClient } = mongodb;

const initializeDatabase = async () => {
  const dbParams = `${config.database.user}:${config.database.pw}@localhost:27017/${config.database.name}`;
  const url = `mongodb://${dbParams}`;
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  return {
    client,
    db: client.db(config.database.name),
  };
};

export default initializeDatabase;
