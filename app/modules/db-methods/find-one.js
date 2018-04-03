const Config = require('../../../config');
const Database = require('../../connections/database');

const Find = (
  collection,
  queryObject = {},
  returnObject = {},
) => (
  new Promise((resolve, reject) => {
    const db = Database.connection;
    db.collection(`${Config.database.prefix}${collection}`)
      .findOne(queryObject, { projection: returnObject })
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        reject(err);
      });
  })
);
module.exports = Find;
