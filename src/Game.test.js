import Game from './Game';

test('Game creates two players', () => {
  const game = Game(5);

  expect(game.players.length).toBe(2);
});