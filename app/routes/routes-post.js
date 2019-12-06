import multer from 'multer';

import config from '../config/config.js';
import getSocket from './middleware/get-socket.js';
import logTasks from './middleware/log-tasks.js';
import messages from './route-messages.js';
import noCacheClient from './middleware/no-cache.js';

import analysis from '../actions/analysis/analysis.js';
import exportImage from '../actions/export/export.js';
import handleVizFile from '../actions/third-party/viz/handle-viz-file.js';
import sync from '../actions/sync/sync.js';
import updateStatus from '../actions/task/status/update-status.js';

const upload = multer({ dest: config.upload });

const post = (router) => {
  router.post('/analysis/viz/:type', getSocket, logTasks, analysis);
  router.post('/analysis/:type', upload.array('file'), getSocket, logTasks, analysis);
  router.post('/export/:type', getSocket, exportImage);
  router.post('/sync/:snapshotID', noCacheClient, getSocket, sync);
  router.post('/task/', updateStatus);
  router.post('/third-party/viz', logTasks, handleVizFile);
  router.post('*', (req, res) => {
    res.status(404).send({ message: messages.invalidRoute });
  });
};

export default post;
