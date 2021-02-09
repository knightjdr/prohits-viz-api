import multer from 'multer';

import config from '../config/config.js';
import getSocket from './middleware/get-socket.js';
import logTasks from './middleware/log-tasks.js';
import messages from './route-messages.js';
import noCacheClient from './middleware/no-cache.js';

import exportImage from '../actions/export/export.js';
import handleVizFile from '../actions/third-party/viz/handle-viz-file.js';
import logClientError from '../actions/error/index.js';
import sync from '../actions/sync/sync.js';
import toolAnalysis from '../actions/analysis/tool/tool.js';
import vizAnalysis from '../actions/analysis/viz/analysis.js';

const upload = multer({ dest: config.upload });
const multerConfig = upload.fields([{ name: 'file' }, { name: 'helperFile' }]);

const post = (router) => {
  router.post('/analysis/viz/:tool', getSocket, logTasks, vizAnalysis);
  router.post('/analysis/:tool', multerConfig, getSocket, logTasks, toolAnalysis);
  router.post('/error/', logClientError);
  router.post('/export/', getSocket, exportImage);
  router.post('/sync/:snapshotID', noCacheClient, getSocket, sync);
  router.post('/third-party/viz', logTasks, handleVizFile);
  router.post('*', (req, res) => {
    res.status(404).send({ message: messages.invalidRoute });
  });
};

export default post;
