import Gameboard from './Gameboard';
import Player from './Player';

test('Player can attack', () => {
  const gb = Gameboard(5);
  const opponent = Gameboard(5);
  const p = Player(gb, opponent);
  
  p.attack('a1') // as long as it doesn't throw we're cool!
});

test('Random attack', () => {
  const gb = Gameboard(5);
  const opponent = Gameboard(5);
  const p = Player(gb, opponent);
  
  p.randomAttack() // as long as it doesn't throw we're cool!
  console.log(opponent.query())
});

// place ships?
// attack
// AI: attack randomly