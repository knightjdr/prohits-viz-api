import mockFS from 'mock-fs';
import fs from 'fs';

import writeInteractions from './write-interactions.js';

const mockedFileSystem = {};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Write interactions', () => {
  it('should merge, dedupe and write interactions to a file', async () => {
    const interactions = {
      biogrid: {
        111: { 222: 1, 333: 1 },
        222: { 111: 1 },
        333: { 111: 1, 444: 1 },
        444: { 333: 1 },
      },
      intact: {
        111: { 222: 1, 333: 1, 444: 1 },
        222: { 111: 1 },
        333: { 111: 1, 444: 1 },
        555: { 333: 1 },
      },
    };
    const outfile = 'interactions.json';

    const expected = {
      111: ['222', '333', '444'],
      222: ['111'],
      333: ['111', '444'],
      444: ['333'],
      555: ['333'],
    };

    await writeInteractions(interactions, outfile);
    const data = fs.readFileSync('./interactions.json', 'utf8');
    expect(JSON.parse(data)).toEqual(expected);
  });
});
