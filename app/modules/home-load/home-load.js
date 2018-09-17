const addMongoDate = require('../helpers/add-mongo-date');
const find = require('../db-methods/find');

/* Grabs the news and spotlight items for the home page. Returns
** the top three stories and top five articles, sorted by date */
const homeLoad = (req, res) => (
  Promise.all([
    find('news', {}, {}, { _id: -1 }, 3),
    find('spotlight', {}, {}, { _id: -1 }, 5),
  ])
    .then((documents) => {
      res.send({
        news: addMongoDate.arr(documents[0]),
        spotlight: addMongoDate.arr(documents[1]),
      });
    })
    .catch(() => {
      res.send({
        news: null,
        spotlight: null,
      });
    })
);

module.exports = homeLoad;
