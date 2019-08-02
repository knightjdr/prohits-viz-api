const config = require('../../../config');
const database = require('../../connections/database');

const insert = async (collection, insertObject = {}) => {
  try {
    const db = database.connection;
    await db.collection(`${config.database.prefix}${collection}`)
      .insert(insertObject);
    return null;
  } catch (error) {
    throw error;
  }
};

module.exports = insert;
