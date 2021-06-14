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

test(`AI can't place a ship bigger than the board`, () => {
  const gb = Gameboard(2);
  const opponent = Gameboard(2);
  const p = Player('ai', gb, opponent);
  const ship = Ship(5);

  expect(() => {
    p.placeShip(ship);
  }).toThrow();
});

test(`AI places fleet of ships`, () => {
  const gb = Gameboard(10);
  const opponent = Gameboard(10);
  const p = Player('ai', gb, opponent);

  const destroyer = Ship(2);
  const submarine = Ship(3);
  const cruiser = Ship(3);
  const battleship = Ship(4);
  const carrier = Ship(5);

  const fleet = [
    destroyer,
    submarine,
    cruiser,
    battleship,
    carrier,
  ];

  p.placeFleet(fleet);
  // just looking for it to not throw an error
  // console.log(gb.printBoard('self'));

});

test(`AI arranges tricky (but not impossible) boards`, () => {
  const gb = Gameboard(5);
  const opponent = Gameboard(5);
  const p = Player('ai', gb, opponent);

  const destroyer = Ship(2);
  const submarine = Ship(3);
  const cruiser = Ship(3);
  const battleship = Ship(4);
  const carrier = Ship(5);

  const fleet = [
    destroyer,
    submarine,
    cruiser,
    battleship,
    carrier,
  ];

  p.placeFleet(fleet);
  // console.log(gb.printBoard('self'));
});

test(`AI gives up on placing an impossible board`, () => {
  const gb = Gameboard(5);
  const opponent = Gameboard(5);
  const p = Player('ai', gb, opponent);

  const destroyer = Ship(5);
  const submarine = Ship(5);
  const cruiser = Ship(5);
  const battleship = Ship(5);
  const carrier = Ship(5);
  const carrier2 = Ship(5);

  const fleet = [
    destroyer,
    submarine,
    cruiser,
    battleship,
    carrier,
    carrier2,
  ];

  expect(() => {
    p.placeFleet(fleet);
  }).toThrow();

  // console.log(gb.printBoard('self'));
});