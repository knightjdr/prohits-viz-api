import express from 'express';

import get from './routes-get.js';
import messages from './route-messages.js';
import post from './routes-post.js';

const router = express.Router();

get(router);
post(router);

router.use((req, res) => {
  res.status(405).send({
    message: messages.notSupported,
  });
});

export default router;
