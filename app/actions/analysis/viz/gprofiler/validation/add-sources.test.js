import addSources from './add-sources';

describe('Add Gprofiler annotatation sources', () => {
  it('should add requested sources and unspecified', () => {
    const defaultSources = ['a', 'b', 'c', 'd'];
    const sources = {
      a: false,
      b: true,
      d: true,
    };
    const expected = ['b', 'c', 'd'];
    expect(addSources(defaultSources, sources)).toEqual(expected);
  });
});
