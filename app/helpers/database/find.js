const config = require('../../config/config');
const database = require('./database');

const find = async (collection, queryObject = {}, returnObject = {}, sorted = {}, limit = 0) => {
  try {
    const db = database.connection;
    return db.collection(`${config.database.prefix}${collection}`)
      .find(queryObject, { projection: returnObject })
      .sort(sorted)
      .limit(limit)
      .toArray();
  } catch (error) {
    return [];
  }
};

module.exports = find;
