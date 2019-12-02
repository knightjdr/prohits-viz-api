const cacheAPI = require('./middleware/cache-route');
const messages = require('./route-messages');
const noCacheClient = require('./middleware/no-cache');

const downloadFile = require('../actions/file/download-file');
const downloadFolder = require('../actions/task/download/download-folder');
const downloadTaskFile = require('../actions/task/download/download-task-file');
const getArticle = require('../actions/news/get-article');
const getHomeContent = require('../actions/home/get-home-content');
const getNewsArticles = require('../actions/news/get-news-articles');

const get = (router) => {
  router.get('/file/:folder', downloadFile);
  router.get('/home/', noCacheClient, cacheAPI, getHomeContent);
  router.get('/news/', noCacheClient, cacheAPI, getNewsArticles);
  router.get('/news/:headline', noCacheClient, cacheAPI, getArticle);
  router.get('/task/:folder', downloadFolder);
  router.get('/task/:folder/:filename', downloadTaskFile);
  router.get('*', (req, res) => {
    res.status(404).send({ message: messages.invalidRoute });
  });
};

module.exports = get;
