import Game from './Game';
import Gameboard from './Gameboard';
import Ship from './Ship';

test('Has function placeShip()', () => {
  const testGB = Gameboard();
  expect(testGB).toMatchObject(
    {
      placeShip: expect.any(Function),
    }
  );
});

test('Assigns a ship with placeShip', () => {
  const testShip = Ship(1);
  const gb = Gameboard(5);
  gb.placeShip(testShip, 'a1', 'down');
  const answer = gb.query('a1', 'self');
  expect(answer.ship).toMatchObject(testShip);
});

test('placeShip() correctly assigns ship of length 3 (not going off the board', () => {
  const testShip = Ship(3);
  const gb = Gameboard(5);
  gb.placeShip(testShip, 'a1', 'down');
  //  ABCDE
  // 1x----
  // 2x----
  // 3x----
  // 4-----
  // 5-----
  const a1 = gb.query('a1', 'self');
  const a2 = gb.query('a2', 'self');
  const a3 = gb.query('a3', 'self');
  const a4 = gb.query('a4', 'self');

  expect(a1.ship).toMatchObject(testShip);
  expect(a2.ship).toMatchObject(testShip);
  expect(a3.ship).toMatchObject(testShip);
  expect(a4.ship).toBe(null);
});

test('Placing a ship off the edge throws an error', () => {
  const gb = Gameboard(5);
  const ship = Ship(2);

  expect(() => {gb.placeShip(ship, 'a1', 'up')}).toThrow();

  // board
  //  ABCDE
  // ?x    
  // 1s----
  // 2-----
  // 3-----
  // 4-----
  // 5-----
});

test('Placing a ship where another one already is throws an error', () => {
  const gb = Gameboard(5);
  const ship1 = Ship(2);
  const ship2 = Ship(2);

  gb.placeShip(ship1, 'a1', 'down');
  expect(() => {
    gb.placeShip(ship2, 'a1', 'right');
  }).toThrow();
});

// verifyCoord()

test('verifyCoord() returns true when coordinate exists', () => {
  const gb = Gameboard(5);
  expect(gb.verifyCoord('b3')).toBe(true);
});

test('verifyCoord() returns false when coordinate does not exist', () => {
  const gb = Gameboard(5);
  expect(gb.verifyCoord('z3')).toBe(false);
});

// TODO: Make some things use verifyCoord()!

// receiveAttack()

test('receiveAttack() marks a hit ship as hit', () => {
  const testShip = Ship(3);
  const gb = Gameboard(5);
  gb.placeShip(testShip, 'a1', 'down');
  //  ABCDE
  // 1x----
  // 2x----
  // 3x----
  // 4-----
  // 5-----

  gb.receiveAttack('a2');

  const a1 = gb.query('a1', 'self');

  expect(a1.ship.pegs).toEqual([0, 1, 0]);
});

// marks a hit
test('receiveAttack() correctly marks board position as hit', () => {
  const testShip = Ship(3);
  const gb = Gameboard(5);
  gb.placeShip(testShip, 'a1', 'down');
  //  ABCDE
  // 1x----
  // 2x----
  // 3x----
  // 4-----
  // 5-----

  gb.receiveAttack('a2');

  const a2 = gb.query('a2', 'self');
  expect(a2.hit).toBe('hit');
});

// marks a miss
test('receiveAttack() correctly marks board position as miss', () => {
  const testShip = Ship(3);
  const gb = Gameboard(5);
  gb.placeShip(testShip, 'a1', 'down');
  //  ABCDE
  // 1x----
  // 2x----
  // 3x----
  // 4-----
  // 5-----

  gb.receiveAttack('d3');

  const d3 = gb.query('d3', 'self');
  expect(d3.hit).toBe('miss');
});
// marks a sunk ship
test('Attacks sink a ship', () => {
  const testShip = Ship(3);
  const gb = Gameboard(5);
  gb.placeShip(testShip, 'a1', 'down');
  //  ABCDE
  // 1x----
  // 2x----
  // 3x----
  // 4-----
  // 5-----

  gb.receiveAttack('a1');
  gb.receiveAttack('a2');
  gb.receiveAttack('a3');

  const a2 = gb.query('a2', 'self');
  expect(a2.ship.isSunk()).toBe(true);
});

// doesn't allow attack where there's already been an attack
test('You cannot hit the same spot twice', () => {
  const testShip = Ship(3);
  const gb = Gameboard(5);
  gb.placeShip(testShip, 'a1', 'down');
  //  ABCDE
  // 1x----
  // 2x----
  // 3x----
  // 4-----
  // 5-----

  gb.receiveAttack('a2');
  expect( () => {
    gb.receiveAttack('a2');
  }).toThrow();
});

// areAllShipsSunk()
test('Gameboard knows when all ships are NOT sunk (1 ship)', () => {
  const testShip = Ship(3);
  const gb = Gameboard(5);
  gb.placeShip(testShip, 'a1', 'down');
  //  ABCDE
  // 1x----
  // 2x----
  // 3x----
  // 4-----
  // 5-----

  gb.receiveAttack('a2');
  expect(gb.areAllShipsSunk()).toBe(false);
});

test('Gameboard knows when all ships are NOT sunk (2 ships)', () => {
  const testShip = Ship(3);
  const gb = Gameboard(5);
  gb.placeShip(testShip, 'a1', 'down');
  gb.placeShip(Ship(2), 'b1', 'right');
  //  ABCDE
  // 1xxx--
  // 2x----
  // 3x----
  // 4-----
  // 5-----

  gb.receiveAttack('a1');
  gb.receiveAttack('a2');
  gb.receiveAttack('a3');
  expect(gb.areAllShipsSunk()).toBe(false);
});

test('Gameboard knows when all ships are sunk', () => {
  const testShip = Ship(1);
  const gb = Gameboard(5);
  gb.placeShip(testShip, 'a2', 'down');
  //  ABCDE
  // 1-----
  // 2x----
  // 3-----
  // 4-----
  // 5-----

  gb.receiveAttack('a2');
  expect(gb.areAllShipsSunk()).toBe(true);
});

test('allShipsAreSunk throws an error if no ships have been placed', () => {
  const gb = Gameboard(5);
  expect(() => { gb.areAllShipsSunk() }).toThrow();
});



// query doesn't show active ships to opponent
test('query doesn\'t show active ships to opponent', () => {
  const testShip = Ship(3);
  const gb = Gameboard(5);
  gb.placeShip(testShip, 'a1', 'down');
  //  ABCDE
  // 1x----
  // 2x----
  // 3x----
  // 4-----
  // 5-----

  gb.receiveAttack('a2');

  const a1 = gb.query('a1', 'opponent');

  expect(a1).not.toMatchObject({ship: testShip});
})

// query shows sunk ships to opponent



// getBoard

// printBoard
test('printBoard returns a string with the board', () => {
  let board = '\n..\n..';
  const gb = Gameboard(2);
  expect(gb.printBoard()).toBe(board);
});

test('printBoard shows a miss', () => {
  let board = '\nO.\n..';
  const gb = Gameboard(2);
  gb.receiveAttack('a1');
  expect(gb.printBoard()).toBe(board);
});

test('printBoard shows two misses', () => {
  let board = '\nO.\nO.';
  const gb = Gameboard(2);
  gb.receiveAttack('a1');
  gb.receiveAttack('a2');
  expect(gb.printBoard()).toBe(board);
});

test('getHitBoard works for blank board', () => {
  let board = {
    a1: '',
    a2: '',
    b1: '',
    b2: '',
  };
  const gb = Gameboard(2);
  expect(gb.getHitBoard()).toMatchObject(board);
});

test('getHitBoard shows a miss', () => {
  let board = {
    a1: 'miss',
    a2: '',
    b1: '',
    b2: '',
  };
  const gb = Gameboard(2);
  gb.receiveAttack('a1');
  expect(gb.getHitBoard()).toMatchObject(board);
});

test(`Gameboard reports all live, no sunk ships at the beginning of the game`, () => {
  const testShip = Ship(3);
  const gb = Gameboard(5);
  gb.placeShip(testShip, 'a1', 'down');
  //   ABCDE
  // 1 S----
  // 2 S----
  // 3 S----
  // 4 -----
  // 5 -----

  expect(gb.getLiveShips()).toEqual([testShip]);
  expect(gb.getSunkShips()).toEqual([]);
});

test(`Gameboard reports a sunk ship`, () => {
  const testShip = Ship(3);
  const testShip2 = Ship(3);
  const gb = Gameboard(5);
  gb.placeShip(testShip, 'a1', 'down');
  gb.placeShip(testShip2, 'e5', 'up');
  //   ABCDE
  // 1 S----
  // 2 S----
  // 3 S---S
  // 4 ----S
  // 5 ----S

  gb.receiveAttack('a1');
  gb.receiveAttack('a2');
  gb.receiveAttack('a3');

  expect(gb.getLiveShips()).toEqual([testShip2]);
  expect(gb.getSunkShips()).toEqual([testShip]);
});