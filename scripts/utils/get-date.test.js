import getDate from './get-date.js';

describe('Get date', () => {
  it('should return current date formatted as YYYY-MM-DD when no argument supplied', () => {
    const DATE_TO_USE = new Date('Mon Jun 07 2021 12:00:00');
    const origDate = Date;
    global.Date = jest.fn(() => DATE_TO_USE);
    global.Date.now = origDate.now;
    global.Date.toISOString = origDate.toISOString;

    const expected = '2021-06-07';
    expect(getDate()).toBe(expected);

    global.Date = origDate;
  });

  it('should return supplied date formatted as YYYY-MM-DD', () => {
    const date = '2020-04-03T12:00:00.000Z';
    const expected = '2020-04-03';
    expect(getDate(date)).toBe(expected);
  });
});
