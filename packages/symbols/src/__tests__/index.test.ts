import { DONE } from '..';

describe('symbols', () => {
  describe('DONE', () => {
    test('creates unique symbol', () => {
      const obj1 = { [DONE]: 'one' };
      const obj2 = { [DONE]: 'two' };
      const obj3 = { [DONE]: 'one' };
      expect(obj1).toEqual(obj3);
      expect(obj1).not.toEqual(obj2);
      expect(obj2).not.toEqual(obj3);
    });
  });
});
