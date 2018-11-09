const article = require('../modules/news/article');
const cache = require('../middleware/cache-route');
const downloadFile = require('../modules/download/download-file');
const downloadTaskFile = require('../modules/download/download-task-file');
const downloadFolder = require('../modules/download/download-folder');
const homeLoad = require('../modules/home-load/home-load');
const messages = require('./route-messages');
const list = require('../modules/news/list');

const get = (router) => {
  router.get('/file/:folder', downloadFile);
  router.get('/home/', cache, homeLoad);
  router.get('/news/', cache, list);
  router.get('/news/:headline', cache, article);
  router.get('/task/:folder', downloadFolder);
  router.get('/task/:folder/:filename', downloadTaskFile);
  router.get('*', (req, res) => {
    res.status(404).send({ message: messages.invalidRoute });
  });
};

module.exports = get;
