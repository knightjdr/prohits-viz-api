const cors = require('cors');
const corsMiddleware = require('./cors');

jest.mock('cors');

describe('CORS', () => {
  it('should set cors with options', () => {
    cors.mockClear();
    corsMiddleware();
    const expected = {
      allowedHeaders: ['Accept', 'Apikey', 'Authorization', 'Content-Type', 'Session'],
      origin: '*',
      optionsSuccessStatus: 204,
    };
    expect(cors).toHaveBeenCalledWith(expected);
  });
});
