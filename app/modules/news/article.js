const addMongoDate = require('../helpers/add-mongo-date');

const findOne = require('../db-methods/find-one');

const article = (req, res) => (
  findOne('news', { headline: req.params.headline })
    .then((newsItem) => {
      if (newsItem) {
        res.send({ news: addMongoDate.obj(newsItem) });
      } else {
        res.status(204);
        res.end();
      }
    })
    .catch(() => {
      res.status(500);
      res.end();
    })
);

module.exports = article;
