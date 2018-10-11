const shouldResolve = require('./should-resolve');

const resolve = jest.fn();

describe('Should resolve', () => {
  it('should not call resolve when curr arg does not equal total', () => {
    shouldResolve(0, 1, resolve);
    expect(resolve).not.toHaveBeenCalled();
  });

  it('should call resolve when curr arg equals total', () => {
    resolve.mockClear();
    shouldResolve(1, 1, resolve);
    expect(resolve).toHaveBeenCalled();
  });

  it('should call resolve when curr arg greater than total', () => {
    resolve.mockClear();
    shouldResolve(2, 1, resolve);
    expect(resolve).toHaveBeenCalled();
  });
});
