import addMongoDate from '../../utils/add-mongo-date.js';
import find from '../../helpers/database/find.js';
import logger from '../../helpers/logging/logger.js';

const getNewsArticles = async (req, res) => {
  try {
    const articles = await find('news', {}, { html: 0 }, { _id: -1 });
    res.send(addMongoDate.arr(articles));
  } catch (error) {
    logger.error(`news articles - ${error.toString()}`);
    res.status(500);
    res.end();
  }
};

export default getNewsArticles;
