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
  expect(a4).toBe('');
});

