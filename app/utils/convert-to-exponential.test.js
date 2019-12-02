const convertToExponential = require('./convert-to-exponential');

describe('Convert a number to exponential form', () => {
  it('should convert to three decimals by default', () => {
    const tests = [
      { expected: '1.235e+4', input: 12346 },
      { expected: '1.235e-4', input: 0.00012346 },
      { expected: '2.858e-8', input: 2.8579035080297038e-8 },
    ];
    tests.forEach((test) => {
      expect(convertToExponential(test.input)).toEqual(test.expected);
    });
  });
});
