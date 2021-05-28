import { boardGenerator, sum, moveOnePeg, parseCoord, alphaToNum, numToAlpha } from './Helpers';

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

test('moveOnePeg moves right on a big board', () => {
  const coord = 'ab2';
  expect(moveOnePeg(coord, 'right')).toBe('ac2');
});

// test ('moveOnePeg scoots over prefix boundaries on a big board e.g. ba1 --> za1', () => {
//   const coord = 'ba1';
//   expect(moveOnePeg(coord, 'left')).toBe('za1');
// });

// edge cases: z1 <-- aa1
// errors for off-board? x <-- a1 (GameBoard handles right and down errors?)

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

test('parseCoord separates coordinates for a multi-letter coord', () => {
  const parsed = parseCoord('ac30')
  expect(parsed[0]).toBe('ac');
  expect(parsed[1]).toBe(30);
});

////////////////
// alphaToNum //
////////////////
test('alphaToNum converts single letter', () => {
  expect(alphaToNum('c')).toBe(3);
});

test('alphaToNum converts a two-digit letter code', () => {
  expect(alphaToNum('aa')).toBe(27);
});

////////////////
// numToAlpha //
////////////////

test('numToAlpha converts a single letter', () => {
  expect(numToAlpha(15)).toBe('o');
});