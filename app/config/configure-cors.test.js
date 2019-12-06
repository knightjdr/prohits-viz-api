import cors from 'cors';
import configureCORS from './configure-cors';

jest.mock('cors');

describe('CORS', () => {
  it('should set cors with options', () => {
    cors.mockClear();
    configureCORS();
    const expected = {
      allowedHeaders: ['Accept', 'Apikey', 'Authorization', 'Content-Type', 'Session'],
      origin: '*',
      optionsSuccessStatus: 204,
    };
    expect(cors).toHaveBeenCalledWith(expected);
  });
});
