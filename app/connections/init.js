const { MongoClient } = require('mongodb');
const Config = require('../../config');

// initialize a mongodb database
const Init = () => (
  new Promise((resolve, reject) => {
    const dbParams = `${Config.database.user}:${Config.database.pw}@localhost:27017/${Config.database.name}`;
    const url = `mongodb://${dbParams}`;
    MongoClient.connect(url)
      .then((client) => {
        resolve({
          client,
          db: client.db(Config.database.name),
        });
      })
      .catch((err) => {
        reject(err);
      });
  })
);
module.exports = Init;
