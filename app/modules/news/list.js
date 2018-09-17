const addMongoDate = require('../helpers/add-mongo-date');
const find = require('../db-methods/find');

const list = (req, res) => (
  find('news', {}, {}, { _id: -1 })
    .then((articles) => {
      res.send({
        news: addMongoDate.arr(articles),
      });
    })
    .catch(() => {
      res.status(500);
      res.end();
    })
);

module.exports = list;
