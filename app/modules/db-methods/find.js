const Config = require('../../../config');
const Database = require('../../connections/database');

const Find = (
  collection,
  queryObject = {},
  returnObject = {},
  sorted = {},
  limit = 0,
) => (
  new Promise((resolve, reject) => {
    const db = Database.connection;
    db.collection(`${Config.database.prefix}${collection}`)
      .find(queryObject, { projection: returnObject })
      .sort(sorted)
      .limit(limit)
      .toArray()
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        reject(err);
      });
  })
);
module.exports = Find;
