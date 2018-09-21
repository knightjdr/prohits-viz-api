const criteria = require('./criteria');

jest.mock('./criteria');
criteria.isNumber.mockReturnValue(12);

const annotations = require('./annotations');

describe('Validate annotations object', () => {
  it('should return null when null', () => {
    const data = undefined;
    expect(annotations(data)).toBeNull();
  });

  it('should return null when not an object', () => {
    const data = [];
    expect(annotations(data)).toBeNull();
  });

  it('should return null when missing "list" prop', () => {
    const data = {};
    expect(annotations(data)).toBeNull();
  });

  it('should return null when list value is not an array', () => {
    const data = { list: {} };
    expect(annotations(data)).toBeNull();
  });

  it('should return null when list array is empty', () => {
    const data = { list: [] };
    expect(annotations(data)).toBeNull();
  });

  it('should return null when list items are not objects', () => {
    const data = { list: ['a'] };
    expect(annotations(data)).toBeNull();
  });

  it('should return null when list items are missing "text" prop', () => {
    const data = { list: [{}] };
    expect(annotations(data)).toBeNull();
  });

  it('should return null when list items are missing "x" prop', () => {
    const data = { list: [{ text: 'a' }] };
    expect(annotations(data)).toBeNull();
  });

  it('should return null when list items are missing "y" prop', () => {
    const data = { list: [{ text: 'a', x: 0.1 }] };
    expect(annotations(data)).toBeNull();
  });

  it('should return object with fontsize and list array', () => {
    const data = { list: [{ text: 'a', x: 0.1, y: 0.2 }] };
    expect(annotations(data)).toEqual({ fontSize: 12, list: data.list });
  });
});
