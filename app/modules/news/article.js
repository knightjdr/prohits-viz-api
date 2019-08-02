const addMongoDate = require('../helpers/add-mongo-date');

const findOne = require('../db-methods/find-one');

const article = async (req, res) => {
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
    res.status(500);
    res.end();
  }
};

module.exports = article;
