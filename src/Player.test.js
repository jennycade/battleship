import Gameboard from './Gameboard';
import Player from './Player';

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

  console.log(p);
  
  p.attack() // as long as it doesn't throw we're cool!
});

// TODO: go back for some testing


// place ships?
// attack
// AI: attack randomly