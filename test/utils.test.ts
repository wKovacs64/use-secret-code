import { isEqual, takeRight } from '../src/utils';

describe('utils', () => {
  describe('isEqual', () => {
    it('correctly identifies flat string array equality', () => {
      const array = ['a', 'b', 'c'];
      const sameContent = ['a', 'b', 'c'];
      const differentOrder = ['a', 'c', 'b'];
      const sameStartWithExtra = ['a', 'b', 'c', 'd'];
      const sameEndWithExtra = ['d', 'a', 'b', 'c'];
      const empty: string[] = [];

      expect(isEqual(array, sameContent)).toBe(true);
      expect(isEqual(array, differentOrder)).toBe(false);
      expect(isEqual(array, sameStartWithExtra)).toBe(false);
      expect(isEqual(array, sameEndWithExtra)).toBe(false);
      expect(isEqual(array, empty)).toBe(false);
    });
  });

  describe('takeRight', () => {
    it('returns an empty array for n < 1', () => {
      const array = ['a', 'b', 'c'];
      const takeZero = takeRight(array, 0);
      const takeNegative = takeRight(array, -4);

      expect(takeZero).toEqual([]);
      expect(takeNegative).toEqual([]);
    });

    it('returns all elements if too many are requested', () => {
      const array = ['a', 'b', 'c'];
      const takeTooMany = takeRight(array, array.length * 2);

      expect(takeTooMany).toEqual(array);
    });

    it('returns the correct elements', () => {
      const array = ['a', 'b', 'c'];

      expect(takeRight(array, 1)).toEqual(['c']);
      expect(takeRight(array, 2)).toEqual(['b', 'c']);
      expect(takeRight(array, 3)).toEqual(['a', 'b', 'c']);
    });
  });
});
