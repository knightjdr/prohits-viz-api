import validate from './validate';

describe('Validate dotplot form', () => {
  describe('control options', () => {
    it('should have control column when control subtraction requested', () => {
      const form = {
        control: 'controlColumn',
        ctrlSub: 'true',
      };
      const validated = validate(form, []);
      expect(validated.control).toBe('controlColumn');
    });

    it('should not have control column when control subtraction is not requested', () => {
      const form = {
        control: 'controlColumn',
        ctrlSub: 'false',
      };
      const validated = validate(form, []);
      expect(validated.control).toBeUndefined();
    });
  });

  describe('readout length options', () => {
    it('should have readout length column when adjustment requested', () => {
      const form = {
        readoutLength: 'lengthColumn',
        readoutLengthNorm: 'true',
      };
      const validated = validate(form, []);
      expect(validated.readoutLength).toBe('lengthColumn');
    });

    it('should not have readout length column when adjustment is not requested', () => {
      const form = {
        readoutLength: 'lengthColumn',
        readoutLengthNorm: 'false',
      };
      const validated = validate(form, []);
      expect(validated.readoutLength).toBeUndefined();
    });
  });

  describe('log options', () => {
    it('should have log prop when value is not "none"', () => {
      const form = {
        logBase: 'e',
      };
      const validated = validate(form, []);
      expect(validated.logBase).toBe('e');
    });

    it('should not have log prop when value is "none"', () => {
      const form = {
        logBase: 'none',
      };
      const validated = validate(form, []);
      expect(validated.logBase).toBeUndefined();
    });
  });

  describe('clustering options', () => {
    it('should keep clustering props when clustering type is "none"', () => {
      const form = {
        clustering: 'none',
        conditionClustering: 'condition',
        readoutClustering: 'readout',
      };
      const validated = validate(form, []);
      expect(validated.conditionClustering).toBe('condition');
      expect(validated.readoutClustering).toBe('readout');
    });

    it('should not keep clustering props when clustering type is not "none"', () => {
      const form = {
        clustering: 'hierarchical',
        conditionClustering: 'condition',
        readoutClustering: 'readout',
      };
      const validated = validate(form, []);
      expect(validated.conditionClustering).toBeUndefined();
      expect(validated.readoutClustering).toBeUndefined();
    });
  });

  describe('unneeded fields', () => {
    let validated;

    beforeAll(() => {
      const form = {
        ctrlSub: 'false',
        edgeColor: '',
        fillColor: 'blueBlack',
        unkmownField: 'something',
      };
      validated = validate(form, []);
    });

    it('should remove "false" value props', () => {
      expect(Object.prototype.hasOwnProperty.call(validated, 'ctrlSub')).toBeFalsy();
    });

    it('should remove empty value props', () => {
      expect(Object.prototype.hasOwnProperty.call(validated, 'edgeColor')).toBeFalsy();
    });

    it('should remove unknown props', () => {
      expect(Object.prototype.hasOwnProperty.call(validated, 'unkmownField')).toBeFalsy();
    });

    it('should keep accepted "truthy" props', () => {
      expect(validated.fillColor).toBe('blueBlack');
    });
  });

  it('should add files as comma-separated list with subdirectory', () => {
    const files = [
      { originalname: 'file1.txt' },
      { originalname: 'file2.txt' },
    ];
    expect(validate({}, files).fileList).toBe('files/file1.txt,files/file2.txt');
  });

  it('should add write dotplot prop', () => {
    expect(validate({}, []).writeDotplot).toBeTruthy();
  });
});
