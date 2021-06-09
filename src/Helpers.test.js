import {
  boardGenerator,
  sum,
  moveOnePeg,
  parseCoord,
  alphaToNum,
  numToAlpha,
} from './Helpers';

test('Sum sums correctly', () => {
  expect(sum([1, 2, 3])).toBe(6);
});

test('Sum sums a different sum correctly', () => {
  expect(sum([2, 3, 4])).toBe(9);
});

test('boardGenerator makes a 2x2 board', () => {
  const board = ['a1', 'b1', 'a2', 'b2'];
  expect(boardGenerator(2)).toEqual(board);
});

test('boardGenerator maxes out at size 26', () => {
  const gb = boardGenerator(30);
  expect(gb.length).toBe(26**2);
});


//////////////////
// moveOnePeg() //
//////////////////

test('moveOnePeg returns coord below', () => {
  const coord = 'b2';
  expect(moveOnePeg(coord, 'down')).toBe('b3');
});

test('moveOnePeg moves up', () => {
  const coord = 'b2';
  expect(moveOnePeg(coord, 'up')).toBe('b1');
});

test('moveOnePeg moves right on a small board', () => {
  const coord = 'b2';
  expect(moveOnePeg(coord, 'right')).toBe('c2');
});

test('moveOnePeg moves left on a small board', () => {
  const coord = 'b2';
  expect(moveOnePeg(coord, 'left')).toBe('a2');
});

//////////////////
// parseCoord() //
//////////////////

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


////////////////
// alphaToNum //
////////////////
test('alphaToNum converts single letter', () => {
  expect(alphaToNum('c')).toBe(3);
});

////////////////
// numToAlpha //
////////////////

test('numToAlpha converts a single letter', () => {
  expect(numToAlpha(15)).toBe('o');
});

test('numToAlpha converts another single letter', () => {
  expect(numToAlpha(5)).toBe('e');
});