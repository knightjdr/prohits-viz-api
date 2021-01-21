import getTimestamp from './get-timestamp.js';

// Mock date
const DATE_TO_USE = new Date('Thu Jan 21 2021 13:05:06 GMT-0500 (Eastern Standard Time)');
const origDate = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.now = origDate.now;

afterAll(() => {
  global.Date = origDate;
});

describe('Get timestamp', () => {
  it('should return formatted timestamp', () => {
    const expected = '2021-01-21, 1:05:06 p.m.';
    expect(getTimestamp()).toBe(expected);
  });
});
