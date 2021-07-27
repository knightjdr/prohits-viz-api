import config from '../../config/config.js';
import database from './database.js';

const insert = async (collection, insertObject = {}) => {
  const db = database.connection;
  await db.collection(`${config.database.prefix}${collection}`)
    .insertOne(insertObject);
  return null;
};

export default insert;
