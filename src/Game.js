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
    console.log('Switching turns');
    if (turn === p1) {
      turn = p2;
    } else {
      turn = p1;
    }
  }

  const whoseTurn = () => {
    return turn;
  }

  const playTurn = (coord) => {
    console.log(`Attacking coordinate ${coord}`);

    // human attacks coordinate
    p1.attack(coord);

    // switch turn to ai
    turn = p2;
    
    // ai attacks human
    p2.attack();

    // switch turn to human
    turn = p1;
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