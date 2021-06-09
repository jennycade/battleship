import Gameboard from './Gameboard';
import Player from './Player';
import Ship from './Ship';

test('Player can attack', () => {
  const gb = Gameboard(5);
  const opponent = Gameboard(5);
  const p = Player('human', gb, opponent);
  
  p.attack('a1') // as long as it doesn't throw we're cool!
});

test('Player attack lands', () => {
  const gb = Gameboard(5);
  const opponent = Gameboard(5);
  const p = Player('human', gb, opponent);

  p.attack('a1');

  const a1 = opponent.query('a1');
  expect(a1.hit).toBe('miss');
});

test('Random attack', () => {
  const gb = Gameboard(5);
  const opponent = Gameboard(5);
  const p = Player('ai', gb, opponent);
  
  p.attack() // as long as it doesn't throw we're cool!
});

// ship placement
test('Place a ship', () => {
  const gb = Gameboard(5);
  const opponent = Gameboard(5);
  const p = Player('human', gb, opponent);
  const ship = Ship(2);

  p.placeShip(ship, 'a1', 'down');

  // board
  //  ABCDE
  // 1s----
  // 2s----
  // 3-----
  // 4-----
  // 5-----

  expect(gb.getBoard().a1.ship).toMatchObject(ship);
  expect(gb.getBoard().a2.ship).toMatchObject(ship);
  expect(gb.getBoard().a3.ship).toBe(null);
});

test('Placing a ship off the edge throws an error', () => {
  const gb = Gameboard(5);
  const opponent = Gameboard(5);
  const p = Player('human', gb, opponent);
  const ship = Ship(2);

  expect(() => {p.placeShip(ship, 'a1', 'up')}).toThrow();

  // board
  //  ABCDE
  // ?x    
  // 1s----
  // 2-----
  // 3-----
  // 4-----
  // 5-----
});

test('Randomly place a ship', () => {
  const gb = Gameboard(5);
  const opponent = Gameboard(5);
  const p = Player('ai', gb, opponent);
  const ship = Ship(2);

  p.placeShip(ship);

  const board = gb.getBoard();

  // count pegs with a ship
  let shipPegs = 0;
  for (let coord in board) {
    if (board[coord].ship) {
      shipPegs++;
    }
  }
  
  expect(shipPegs).toBe(2);
});

