const article = require('../modules/news/article');
const cacheAPI = require('../middleware/cache-route');
const downloadFile = require('../modules/download/download-file');
const downloadTaskFile = require('../modules/download/download-task-file');
const downloadFolder = require('../modules/download/download-folder');
const homeLoad = require('../modules/home-load/home-load');
const messages = require('./route-messages');
const noCacheClient = require('../middleware/no-cache');
const list = require('../modules/news/list');

const get = (router) => {
  router.get('/file/:folder', downloadFile);
  router.get('/home/', noCacheClient, cacheAPI, homeLoad);
  router.get('/news/', noCacheClient, cacheAPI, list);
  router.get('/news/:headline', noCacheClient, cacheAPI, article);
  router.get('/task/:folder', downloadFolder);
  router.get('/task/:folder/:filename', downloadTaskFile);
  router.get('*', (req, res) => {
    res.status(404).send({ message: messages.invalidRoute });
  });
};

module.exports = get;
