const config = require('../../config/config');
const database = require('./database');

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

module.exports = insert;
