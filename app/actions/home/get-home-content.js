import addMongoDate from '../../utils/add-mongo-date.js';
import find from '../../helpers/database/find.js';
import logger from '../../helpers/logging/logger.js';

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
    logger.error(`home content - ${error.toString()}`);
    res.send({
      news: null,
      spotlight: null,
    });
  }
};

export default getHomeContent;
