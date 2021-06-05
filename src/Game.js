import Gameboard from "./Gameboard";
import Player from './Player';

const Game = (size) => {
  const gb1 = Gameboard(size);
  const gb2 = Gameboard(size);

  const p1 = Player('human', gb1, gb2);
  const p2 = Player('ai', gb2, gb1);

  const getPlayers = () => [p1, p2];
  const getGameboards = () => [gb1, gb2];

  let turn = p1;

  const switchTurn = () => {
    if (turn === p1) {
      turn = p2;
    } else {
      turn = p1;
    }
  }

  const whoseTurn = () => {
    return turn;
  }

  const playTurn = (player, coord = '') => {
    if (player === turn) {
      // human play
      if (player.type === 'human') {
        player.attack(coord);
      }
      // ai play
      if (player.type === 'ai') {
        setTimeout(() => { player.attack() }, 1000);
      }

      // switch turns
      switchTurn();
    }
  }

  return {
    getPlayers,
    getGameboards,
    switchTurn,
    whoseTurn,
    playTurn,
  };

  
}

export default Game;