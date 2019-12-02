jest.mock('../../config/config', () => ({
  ignore: [/^tmp\/test/, /^tmp\/uploads$/],
}));

const checkIgnore = require('./check-ignore');

describe('Name of the group', () => {
  it('should return all files that do not match an ignore pattern', () => {
    const files = ['tmp/test', 'tmp/test2', 'tmp/abcd', 'tmp/uploads', 'tmp/uploads/defg'];
    const expectedFiles = ['tmp/abcd', 'tmp/uploads/defg'];
    expect(checkIgnore(files)).toEqual(expectedFiles);
  });
});
