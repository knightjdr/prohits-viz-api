import addMongoDate from '../../utils/add-mongo-date.js';
import findOne from '../../helpers/database/find-one.js';
import logger from '../../helpers/logging/logger.js';

const getArticle = async (req, res) => {
  try {
    const headline = req.params.headline.replace(/-/g, ' ');
    const data = await findOne('news', { headline });
    if (data) {
      res.send({ article: addMongoDate.obj(data) });
    } else {
      res.status(204);
      res.end();
    }
  } catch (error) {
    logger.error(`news article - ${error.toString()}`);
    res.status(500);
    res.end();
  }
};

export default getArticle;
