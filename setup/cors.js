const cors = require('cors');

const headers = ['Accept', 'Authorization', 'Content-Type', 'Session'];

const corsSetup = () => (
  cors({
    allowedHeaders: headers,
    origin: '*',
    optionsSuccessStatus: 204,
  })
);

module.exports = corsSetup;
