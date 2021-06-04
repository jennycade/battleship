import Game from './Game';

jest.useFakeTimers();


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

test(`When it's an ai player's turn, it plays after a brief wait`, () => {
  // set up game
  const game = Game(5);
  const p1 = game.players[0];
  const p2 = game.players[1];

  // p1 turn
  game.playTurn(p1, 'a1');

  // p2 turn
  expect(game.whoseTurn()).toBe(p2);


  // wait for p2 to play
  setTimeout(() => {
    expect(game.whoseTurn()).toBe(p1);
  }, 2000);
  jest.runAllTimers();
})