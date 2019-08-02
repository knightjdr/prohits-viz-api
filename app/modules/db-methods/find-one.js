const config = require('../../../config');
const database = require('../../connections/database');

const find = async (collection, queryObject = {}, returnObject = {}) => {
  try {
    const db = database.connection;
    return await db.collection(`${config.database.prefix}${collection}`)
      .findOne(queryObject, { projection: returnObject });
  } catch (error) {
    throw error;
  }
};

module.exports = find;
