import config from '../../config/config.js';
import database from './database.js';

const findOne = async (collection, queryObject = {}, returnObject = {}) => {
  try {
    const db = database.connection;
    return db.collection(`${config.database.prefix}${collection}`)
      .findOne(queryObject, { projection: returnObject });
  } catch (error) {
    return null;
  }
};

export default findOne;
