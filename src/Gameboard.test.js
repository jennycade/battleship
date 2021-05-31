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
})

// query doesn't show active ships to opponent
// query shows sunk ships to opponent