import config from '../../config/config.js';
import database from './database.js';

const insert = async (collection, insertObject = {}) => {
  try {
    const db = database.connection;
    await db.collection(`${config.database.prefix}${collection}`)
      .insertOne(insertObject);
    return null;
  } catch (error) {
    return error;
  }
};

export default insert;
