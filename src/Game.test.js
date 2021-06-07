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

