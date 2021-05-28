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

// test('Places a ship of length 1 at A1 on the board', () => {
//   const testShip = Ship(1);
//   const gb = Gameboard();
//   gb.placeShip(testShip, 'a1');
//   expect(gb.query('a1', 'self')).toMatchObject({
//     a1: {
//       ship: testShip,
//       pos: 1,
//     }
//   })
// })