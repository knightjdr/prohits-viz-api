const Config = require('../../../config');
const Database = require('../../connections/database');

const find = (
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
module.exports = find;
