import Gameboard from "./Gameboard";
import Player from './Player';

const Game = (size) => {
  const gb1 = Gameboard(size);
  const gb2 = Gameboard(size);

  const p1 = Player(gb1, gb2);
  const p2 = Player(gb2, gb1);

  const players = [p1, p2];

  return {
    players,
  };
}

export default Game;