import Game from './Game';

jest.useFakeTimers();


test('Game creates two players', () => {
  const game = Game(5);

  expect(game.getPlayers().length).toBe(2);
});

test('The game takes turns', () => {
  const game = Game(5);

  expect(game.whoseTurn()).toBe(game.getPlayers()[0]);
  
  game.switchTurn();

  expect(game.whoseTurn()).toBe(game.getPlayers()[1]);

  game.switchTurn();

  expect(game.whoseTurn()).toBe(game.getPlayers()[0]);
});

test('The game accumulates hits', () => {
  const game = Game(2);
  game.createFleets([1]);
  game.placePlayerShip(1, 'a1', 'down');
  
  game.playTurn('a1');
  // game.playTurn('a2', true); // disabling to read other tests
  // I don't know how to write expect statement for console.log
  // FOR HUMAN TESTING:
  // console.log should include
  //
  // "
  // OPPONENT'S BOARD
  //
  // O.
  // O.
  // "
});

test('getHitBoards returns a non-nested object representing the board', () => {
  const game = Game(2);
  const boards = game.getHitBoards();
  expect(boards.length).toBe(2);
});

test('Create the standard fleet', () => {
  const game = Game(10);
  game.createFleets();

  expect(game.getPhase()).toBe('placement');

  // figure out how to test this...
});

test(`Game handles player ship placement`, () => {
  const game = Game(10);
  game.createFleets();

  game.placePlayerShip(2, 'a1', 'down');
  const board = game.getGameboards()[0].printBoard('self');
  expect(board).toBe(
    `\nS.........\nS.........\n..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........`    
  );
});

test(`Game places multiple ships`, () => {
  const game = Game(10);
  game.createFleets();

  game.placePlayerShip(2, 'a1', 'down');
  game.placePlayerShip(3, 'b2', 'right');

  const board = game.getGameboards()[0].printBoard('self');
  expect(board).toBe(
    `\nS.........\nSSSS......\n..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........`    
  );
});

test(`Game switches to attack mode when all player ships ar placed`, () => {
  const game = Game(10);
  game.createFleets();

  game.placePlayerShip(2, 'a1', 'down');
  game.placePlayerShip(3, 'b1', 'down');
  game.placePlayerShip(3, 'c1', 'down');
  game.placePlayerShip(4, 'd1', 'down');
  game.placePlayerShip(5, 'e1', 'down');

  expect(game.getPhase()).toBe('attack');
});

test(`Game lets you try again if you try to place a ship off the board`, () => {
  const game = Game(10);
  game.createFleets();

  game.placePlayerShip(2, 'a1', 'up');
  expect(game.placePlayerShip(2, 'a1', 'down')).toBe(true);
});

test(`Game doesn't let player place a ship on top of another ship`, () => {
  const game = Game(10);
  game.createFleets();

  game.placePlayerShip(2, 'a1', 'down');
  expect(game.placePlayerShip(3, 'a1', 'down')).toBe(false);
});

test(`Can't place the same ship twice`, () => {
  const game = Game(10);
  game.createFleets();

  game.placePlayerShip(2, 'a1', 'down');
  expect(game.placePlayerShip(2, 'j1', 'down')).toBe(false);
});

test(`Game throws an error if you try to attack during ship placement phase`, () => {
  const game = Game(10);
  game.createFleets();

  expect(() => {
    game.playTurn('a1')
  }).toThrow();
});