import extToMimeType from './ext-to-mime-type.js';

describe('Name of the group', () => {

  it('should return png mimetype', () => {
    expect(extToMimeType('path/file.png')).toBe('image/png');
  });

  it('should return svg mimetype', () => {
    expect(extToMimeType('path/file.svg')).toBe('image/svg+xml');
  });

  it('should return default mimetype', () => {
    expect(extToMimeType('path/file.jpg')).toBe('text/plain');
  });
});
