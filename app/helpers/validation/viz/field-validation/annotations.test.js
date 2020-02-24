import validateAnnotations from './annotations.js';

describe('Validate annotations object', () => {
  it('should return valid annotation object', () => {
    const data = {
      fontSize: 14,
      list: {
        id1: {
          text: 'a',
          position: { x: 0.1, y: 0.2 },
        },
      },
    };

    const expected = {
      fontSize: 14,
      list: data.list,
    };
    expect(validateAnnotations(data)).toEqual(expected);
  });

  it('should return null when undefined', () => {
    const data = undefined;
    expect(validateAnnotations(data)).toBeNull();
  });

  it('should return null when missing "list" prop', () => {
    const data = {};
    expect(validateAnnotations(data)).toBeNull();
  });

  it('should return null when list value is not an object', () => {
    const data = { list: [] };
    expect(validateAnnotations(data)).toBeNull();
  });

  it('should return null when list items are not objects', () => {
    const data = { list: ['a'] };
    expect(validateAnnotations(data)).toBeNull();
  });

  it('should return null when annotation is missing "text" prop', () => {
    const data = {
      list: {
        id1: {},
      },
    };
    expect(validateAnnotations(data)).toBeNull();
  });

  it('should return null when annotation is missing "position" prop', () => {
    const data = {
      list: {
        id1: {
          text: 'test',
        },
      },
    };
    expect(validateAnnotations(data)).toBeNull();
  });

  it('should return null when annotation.position is not an object', () => {
    const data = {
      list: {
        id1: {
          position: [],
          text: 'test',
        },
      },
    };
    expect(validateAnnotations(data)).toBeNull();
  });

  it('should return null when annotation is missing "position.x" prop', () => {
    const data = {
      list: {
        id1: {
          position: {},
          text: 'test',
        },
      },
    };
    expect(validateAnnotations(data)).toBeNull();
  });

  it('should return null when "position.x" is outside of accepted range', () => {
    const data = {
      list: {
        id1: {
          position: { x: -0.5 },
          text: 'test',
        },
      },
    };
    expect(validateAnnotations(data)).toBeNull();
  });

  it('should return null when annotation is missing "position.y" prop', () => {
    const data = {
      list: {
        id1: {
          position: { x: 0.5 },
          text: 'test',
        },
      },
    };
    expect(validateAnnotations(data)).toBeNull();
  });

  it('should return null when "position.y" is outside of accepted range', () => {
    const data = {
      list: {
        id1: {
          position: { x: 0.5, y: 1.1 },
          text: 'test',
        },
      },
    };
    expect(validateAnnotations(data)).toBeNull();
  });

  it('should return default fontSize when supplied font size is not a number', () => {
    const data = {
      fontSize: '14px',
      list: {
        id1: {
          text: 'a',
          position: { x: 0.1, y: 0.2 },
        },
      },
    };

    expect(validateAnnotations(data).fontSize).toEqual(12);
  });
});
