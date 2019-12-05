const addMongoDate = require('../../utils/add-mongo-date');
const find = require('../../helpers/database/find');

const parseDocuments = documents => ({
  news: addMongoDate.arr(documents[0]),
  spotlight: addMongoDate.arr(documents[1]),
});

/* Grabs the news and spotlight items for the home page. Returns
** the top one stories and top five articles, sorted by date. */
const getHomeContent = async (req, res) => {
  try {
    const documents = await Promise.all([
      find('news', {}, {}, { _id: -1 }, 1),
      find('spotlight', {}, {}, { _id: -1 }, 5),
    ]);
    res.send(parseDocuments(documents));
  } catch (error) {
    res.send({
      news: null,
      spotlight: null,
    });
  }
};

module.exports = getHomeContent;
