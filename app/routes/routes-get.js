const article = require('../modules/news/article');
const downloadFile = require('../modules/download/download-file');
const downloadFolder = require('../modules/download/download-folder');
const homeLoad = require('../modules/home-load/home-load');
const messages = require('./route-messages');
const list = require('../modules/news/list');

const get = (router) => {
  router.get('/file/:folder', downloadFile);
  router.get('/home/', homeLoad);
  router.get('/news/', list);
  router.get('/news/:headline', article);
  router.get('/task/:folder', downloadFolder);
  router.get('*', (req, res) => {
    res.status(404).send({ message: messages.invalidRoute });
  });
};

module.exports = get;
