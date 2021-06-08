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
