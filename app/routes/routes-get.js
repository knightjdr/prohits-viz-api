import cacheAPI from './middleware/cache-route.js';
import messages from './route-messages.js';
import noCacheClient from './middleware/no-cache.js';

import downloadFile from '../actions/file/download-file.js';
import downloadFolder from '../actions/task/download/download-folder.js';
import downloadTaskFile from '../actions/task/download/download-task-file.js';
import getArticle from '../actions/news/get-article.js';
import getHomeContent from '../actions/home/get-home-content.js';
import getNewsArticles from '../actions/news/get-news-articles.js';

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

export default get;
