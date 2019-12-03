jest.mock('../../config/config', () => ({
  ignore: [/^tmp\/test/, /^tmp\/uploads$/],
}));

const filterOutFoldersToIgnore = require('./filter-folders');

describe('Name of the group', () => {
  it('should return all files that do not match an ignore pattern', () => {
    const files = ['tmp/test', 'tmp/test2', 'tmp/abcd', 'tmp/uploads', 'tmp/uploads/defg'];
    const expectedFiles = ['tmp/abcd', 'tmp/uploads/defg'];
    expect(filterOutFoldersToIgnore(files)).toEqual(expectedFiles);
  });
});
