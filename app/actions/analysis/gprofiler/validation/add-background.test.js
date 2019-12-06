import addBackground from './add-background';
import parseBackground from './parse-background';

jest.mock('./parse-background');

describe('Add gene background', () => {
  it('should add background for custom domain_scope', () => {
    parseBackground.mockReturnValue(['a', 'b', 'c']);
    const body = {};
    const domainScope = 'custom';
    const expected = {
      background: ['a', 'b', 'c'],
    };
    expect(addBackground(domainScope, body)).toEqual(expected);
  });

  it('should return default domain_scope when background is empty', () => {
    parseBackground.mockReturnValue([]);
    const body = {};
    const defaultScope = 'annotated';
    const domainScope = 'custom';
    const expected = {
      domain_scope: defaultScope,
    };
    expect(addBackground(domainScope, body, defaultScope)).toEqual(expected);
  });

  it('should return empty object when domain_scope not equal to "custom"', () => {
    parseBackground.mockReturnValue([]);
    const body = {};
    const domainScope = 'known';
    const expected = {};
    expect(addBackground(domainScope, body)).toEqual(expected);
  });
});
