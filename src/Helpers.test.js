import Gameboard from './Gameboard';
import { boardGenerator, sum, moveOnePeg, parseCoord } from './Helpers';

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

// test('moveOnePeg returns coord below', () => {
//   const gb = Gameboard(3);
//   const coord = 'b2';
//   expect(moveOnePeg(coord, 'down', 3)).toBe('b3');
// });

test('parseCoord separates coordinates for single-letter coord', () => {
  const parsed = parseCoord('b2')
  expect(parsed[0]).toBe('b');
  expect(parsed[1]).toBe(2);
});

test('parseCoord separates coordinates for another single-letter coord', () => {
  const parsed = parseCoord('c3')
  expect(parsed[0]).toBe('c');
  expect(parsed[1]).toBe(3);
});