import { sum } from './Helpers';

test('Sum sums correctly', () => {
  expect(sum([1, 2, 3])).toBe(6);
});

test('Sum sums a different sum correctly', () => {
  expect(sum([2, 3, 4])).toBe(9);
});