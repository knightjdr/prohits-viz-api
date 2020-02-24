import isValidColor from '../../field-validation/is-valid-color.js';
import validateMarkers from './markers.js';

jest.mock('../../field-validation/is-valid-color.js');
isValidColor.mockReturnValue('#000000');

describe('Validate markers object', () => {
  it('should return valid object', () => {
    const data = {
      list: {
        id1: {
          height: 10,
          width: 15,
          x: 0.5,
          y: 0.2,
        },
      },
    };
    expect(validateMarkers(data)).toEqual({ color: '#000000', list: data.list });
  });

  it('should return null when undefined', () => {
    const data = undefined;
    expect(validateMarkers(data)).toBeNull();
  });

  it('should return null when missing "list" prop', () => {
    const data = {};
    expect(validateMarkers(data)).toBeNull();
  });

  it('should return null when list value is not an object', () => {
    const data = { list: [] };
    expect(validateMarkers(data)).toBeNull();
  });

  it('should return null when marker is missing "height" prop', () => {
    const data = {
      list: {
        id1: {},
      },
    };
    expect(validateMarkers(data)).toBeNull();
  });

  it('should return null when marker is missing "width" prop', () => {
    const data = {
      list: {
        id1: {
          height: 10,
        },
      },
    };
    expect(validateMarkers(data)).toBeNull();
  });

  it('should return null when marker is missing "x" prop', () => {
    const data = {
      list: {
        id1: {
          height: 10,
          width: 15,
        },
      },
    };
    expect(validateMarkers(data)).toBeNull();
  });

  it('should return null when x value is outside acceptable range', () => {
    const data = {
      list: {
        id1: {
          height: 10,
          width: 15,
          x: 1.1,
        },
      },
    };
    expect(validateMarkers(data)).toBeNull();
  });

  it('should return null when marker is missing "y" prop', () => {
    const data = {
      list: {
        id1: {
          height: 10,
          width: 15,
          x: 0.5,
        },
      },
    };
    expect(validateMarkers(data)).toBeNull();
  });

  it('should return null when y value is outside acceptable range', () => {
    const data = {
      list: {
        id1: {
          height: 10,
          width: 15,
          x: 0.5,
          y: -0.5,
        },
      },
    };
    expect(validateMarkers(data)).toBeNull();
  });
});
