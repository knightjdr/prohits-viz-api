import mapIntersectionToGenes from './map-intersections-to-genes';

describe('Map g:Profiler result intersections', () => {
  it('should return an array of genes that have at least one intersection', () => {
    const genes = ['a', 'b', 'c', 'd'];
    const intersections = [
      [],
      ['IEA'],
      ['ISS', 'IEA'],
      [],
    ];
    const expected = ['b', 'c'];
    expect(mapIntersectionToGenes(intersections, genes)).toEqual(expected);
  });
});
