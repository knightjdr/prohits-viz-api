import shouldResolve from './should-resolve';

const resolve = jest.fn();

describe('Should resolve task', () => {
  it('should not call resolve when curr arg does not equal total', () => {
    shouldResolve(1, 2, '', resolve);
    expect(resolve).not.toHaveBeenCalled();
  });

  it('should call resolve when curr arg equals total', () => {
    shouldResolve(2, 2, '', resolve);
    expect(resolve).toHaveBeenCalled();
  });
});
