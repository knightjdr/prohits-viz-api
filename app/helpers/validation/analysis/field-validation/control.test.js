import validateControl from './control.js';

describe('Validate control settings', () => {
  it('should validate acceptable settings', () => {
    const errors = {};
    const settings = { ctrlSub: true, control: 'ctrlCounts' };

    const expected = [
      { ctrlSub: true, control: 'ctrlCounts' },
      {},
    ];

    expect(validateControl(settings, errors)).toEqual(expected);
  });

  it('should unset control columm name when subtraction not requested', () => {
    const errors = {};
    const settings = { ctrlSub: false, control: 'ctrlCounts' };

    const expected = [
      { ctrlSub: false, control: '' },
      {},
    ];

    expect(validateControl(settings, errors)).toEqual(expected);
  });

  it('should return error when subtraction requested without column name', () => {
    const errors = {};
    const settings = { ctrlSub: true, control: '' };

    const expected = [
      { ctrlSub: true, control: '' },
      { control: 'missing column name' },
    ];

    expect(validateControl(settings, errors)).toEqual(expected);
  });
});
