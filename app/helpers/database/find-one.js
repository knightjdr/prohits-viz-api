const config = require('../../config/config');
const database = require('./database');

const findOne = async (collection, queryObject = {}, returnObject = {}) => {
  try {
    const db = database.connection;
    return db.collection(`${config.database.prefix}${collection}`)
      .findOne(queryObject, { projection: returnObject });
  } catch (error) {
    return null;
  }
};

module.exports = findOne;
