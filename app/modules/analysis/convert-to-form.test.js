jest.mock('form-data', () => class {
  constructor() {
    this.form = {};
  }
  append(key, value) {
    this.form[key] = value;
  }
});

const convertToForm = require('./convert-to-form');

const obj = {
  a: 1,
  b: 2,
  c: 'z',
};

describe('Convert to form', () => {
  it('should convert an object to a Form object', () => {
    expect(convertToForm(obj)).toEqual({ form: obj });
  });
});
