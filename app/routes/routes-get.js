const article = require('../modules/news/article');
const homeLoad = require('../modules/home-load/home-load');
const messages = require('./route-messages');
const list = require('../modules/news/list');

const get = (app) => {
  app.get('/api/home/', homeLoad);
  app.get('/api/news/', list);
  app.get('/api/news/:headline', article);
  app.get('*', (req, res) => {
    res.status(404).send({ message: messages.invalidRoute });
  });
};

module.exports = get;
