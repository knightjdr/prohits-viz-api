import markers from './markers';
import validColor from './valid-color';

jest.mock('./valid-color');
validColor.mockReturnValue('#000000');

describe('Validate markers object', () => {
  it('should return null when null', () => {
    const data = undefined;
    expect(markers(data)).toBeNull();
  });

  it('should return null when not an object', () => {
    const data = [];
    expect(markers(data)).toBeNull();
  });

  it('should return null when missing "list" prop', () => {
    const data = {};
    expect(markers(data)).toBeNull();
  });

  it('should return null when list value is not an array', () => {
    const data = { list: {} };
    expect(markers(data)).toBeNull();
  });

  it('should return null when list array is empty', () => {
    const data = { list: [] };
    expect(markers(data)).toBeNull();
  });

  it('should return null when list items are not objects', () => {
    const data = { list: ['a'] };
    expect(markers(data)).toBeNull();
  });

  it('should return null when list items are missing "height" prop', () => {
    const data = { list: [{}] };
    expect(markers(data)).toBeNull();
  });

  it('should return null when list items are missing "width" prop', () => {
    const data = { list: [{ height: 10 }] };
    expect(markers(data)).toBeNull();
  });

  it('should return null when list items are missing "x" prop', () => {
    const data = { list: [{ height: 10, width: 15 }] };
    expect(markers(data)).toBeNull();
  });

  it('should return null when list items are missing "y" prop', () => {
    const data = { list: [{ height: 10, width: 15, x: 5 }] };
    expect(markers(data)).toBeNull();
  });

  it('should return object with fontsize and list array', () => {
    const data = {
      list: [
        {
          height: 10,
          width: 15,
          x: 5,
          y: 7,
        },
      ],
    };
    expect(markers(data)).toEqual({ color: '#000000', list: data.list });
  });
});
