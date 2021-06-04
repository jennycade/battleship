import Game from './Game';

test('Game creates two players', () => {
  const game = Game(5);

  expect(game.players.length).toBe(2);
});

test('The game takes turns', () => {
  const game = Game(5);

  expect(game.whoseTurn()).toBe(game.players[0]);
  
  game.switchTurn();

  expect(game.whoseTurn()).toBe(game.players[1]);

  game.switchTurn();

  expect(game.whoseTurn()).toBe(game.players[0]);
});