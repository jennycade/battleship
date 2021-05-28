import { boardGenerator, sum } from './Helpers';

test('Sum sums correctly', () => {
  expect(sum([1, 2, 3])).toBe(6);
});

test('Sum sums a different sum correctly', () => {
  expect(sum([2, 3, 4])).toBe(9);
});

test('boardGenerator makes a 2x2 board', () => {
  const board = {
    a1: '',
    a2: '',
    b1: '',
    b2: '',
  };
  expect(boardGenerator(2)).toMatchObject(board);
});

test('boardGenerator makes a board bigger than 26', () => {
  const bigBoard = boardGenerator(30);
  expect(bigBoard).toMatchObject(
    {
      aa30: '',
    }
  );
});