const express = require('express');

const get = require('./routes-get');
const messages = require('./route-messages');
const post = require('./routes-post');

const router = express.Router();

get(router);
post(router);
router.use((req, res) => {
  res.status(405).send({
    message: messages.notSupported,
  });
});

module.exports = router;
