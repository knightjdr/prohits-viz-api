import { createSourceLink, links } from './create-source-link';

describe('Create source link for gProfiler results', () => {
  describe('sources that can be linked to', () => {
    it('should create link for GO:BP', () => {
      const id = 'GO:0035329';
      const expected = `${links['GO:BP'].url}${id}`;
      expect(createSourceLink(id, 'GO:BP')).toBe(expected);
    });

    it('should create link for GO:CC', () => {
      const id = 'GO:0015630';
      const expected = `${links['GO:CC'].url}${id}`;
      expect(createSourceLink(id, 'GO:CC')).toBe(expected);
    });

    it('should create link for GO:MF', () => {
      const id = 'GO:0005515';
      const expected = `${links['GO:MF'].url}${id}`;
      expect(createSourceLink(id, 'GO:MF')).toBe(expected);
    });

    it('should create link for HP', () => {
      const id = 'HP:0002118';
      const expected = `${links.HP.url}${id}`;
      expect(createSourceLink(id, 'HP')).toBe(expected);
    });

    it('should create link for KEGG', () => {
      const id = 'KEGG:04390';
      const expected = `${links.KEGG.url}04390`;
      expect(createSourceLink(id, 'KEGG')).toBe(expected);
    });

    it('should create link for MIRNA', () => {
      const id = 'MIRNA:hsa-miR-130b-3p';
      const expected = `${links.MIRNA.url}hsa-miR-130b-3p`;
      expect(createSourceLink(id, 'MIRNA')).toBe(expected);
    });

    it('should create link for REAC', () => {
      const id = 'REAC:R-HSA-2028269';
      const expected = `${links.REAC.url}R-HSA-2028269`;
      expect(createSourceLink(id, 'REAC')).toBe(expected);
    });

    it('should create link for WP', () => {
      const id = 'WP:WP4537';
      const expected = `${links.WP.url}WP4537`;
      expect(createSourceLink(id, 'WP')).toBe(expected);
    });
  });

  describe('sources that cannot be linked to', () => {
    it('should not create link for CORUM', () => {
      const id = 'CORUM:6403';
      const expected = '';
      expect(createSourceLink(id, 'CORUM')).toBe(expected);
    });

    it('should not create link for HPA', () => {
      const id = 'HPA:018010_22';
      const expected = '';
      expect(createSourceLink(id, 'HPA')).toBe(expected);
    });

    it('should not create link for TF', () => {
      const id = 'TF:M00695_0';
      const expected = '';
      expect(createSourceLink(id, 'TF')).toBe(expected);
    });
  });
});
