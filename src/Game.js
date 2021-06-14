import Gameboard from "./Gameboard";
import Player from './Player';
import Ship from './Ship';

const Game = (size) => {
  const gb1 = Gameboard(size);
  const gb2 = Gameboard(size);

  const p1 = Player('human', gb1, gb2);
  const p2 = Player('ai', gb2, gb1);

  const getPlayers = () => [p1, p2];
  const getGameboards = () => [gb1, gb2];

  let phase = 'init';
  let turn = p1;
  let p1Ships = [];
  let p2Ships = [];

  const getPhase = () => phase;

  const createFleets = (shipSizes = [2, 3, 3, 4, 5]) => {

    for (let i=0; i<shipSizes.length; i++) {
      // make a ship
      p1Ships.push(Ship(shipSizes[i]));
      p2Ships.push(Ship(shipSizes[i]));
    }

    phase = 'placement';
    // tell AI to place its ships

    p2.placeFleet(p2Ships);

  }

  const getHitBoards = () => {
    return [gb1.getHitBoard(), gb2.getHitBoard()];
  }


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

  const playTurn = (coord, verbose = false) => {
    // TODO: Verify coordinate first
    // human attacks coordinate
    // console.log(`Attacking coordinate ${coord}`);
    p1.attack(coord);

    // switch turn to ai
    turn = p2;

    // wait a second
    
    // ai attacks human
    const randomCoord = p2.attack();
    // console.log(`The computer attacked coordinate ${randomCoord}`);

    // switch turn to human
    turn = p1;

    // print the boards
    if (verbose) {
      console.log(`OPPONENT'S BOARD`);
      console.log(gb2.printBoard());
      console.log(`PLAYER BOARD`);
      console.log(gb1.printBoard());
    }

    // return coord that ai attacked
    return randomCoord;
  }

  return {
    getPlayers,
    getGameboards,
    getHitBoards,
    getPhase,
    createFleets,
    switchTurn,
    whoseTurn,
    playTurn,
  };

  
}

export default Game;