const addMongoDate = require('../helpers/add-mongo-date');
const find = require('../db-methods/find');

const list = async (req, res) => {
  try {
    const articles = await find('news', {}, { html: 0 }, { _id: -1 });
    res.send(addMongoDate.arr(articles));
  } catch (error) {
    res.status(500);
    res.end();
  }
};

module.exports = list;
