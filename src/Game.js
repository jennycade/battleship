import Gameboard from "./Gameboard";
import Player from './Player';

const Game = (size) => {
  const gb1 = Gameboard(size);
  const gb2 = Gameboard(size);

  const p1 = Player(gb1, gb2);
  const p2 = Player(gb2, gb1);

  const players = [p1, p2];

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

  return {
    players,
    switchTurn,
    whoseTurn,
  };

  
}

export default Game;