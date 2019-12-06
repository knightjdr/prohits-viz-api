import cors from 'cors';

const headers = ['Accept', 'Apikey', 'Authorization', 'Content-Type', 'Session'];

// All origins are allowed because our api can be used by third party sites.
const configureCORS = () => (
  cors({
    allowedHeaders: headers,
    origin: '*',
    optionsSuccessStatus: 204,
  })
);

export default configureCORS;
