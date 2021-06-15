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
  let p1ShipsToPlace = [];
  let p2ShipsToPlace = [];

  const getPhase = () => phase;

  const createFleets = (shipSizes = [2, 3, 3, 4, 5]) => {

    for (let i=0; i<shipSizes.length; i++) {
      // make a ship
      p1ShipsToPlace.push(Ship(shipSizes[i]));
      p2ShipsToPlace.push(Ship(shipSizes[i]));
    }

    phase = 'placement';
    // tell AI to place its ships

    p2.placeFleet(p2ShipsToPlace);
    // remove from shipsToPlace
    p2ShipsToPlace = [];

  }

  const placePlayerShip = (shipSize, coord, dir) => {

    // find ship of correct size
    const shipIndex = p1ShipsToPlace.findIndex(x => x.pegs.length===shipSize);
    const ship = p1ShipsToPlace[shipIndex];

    try {
      // place it
      p1.placeShip(ship, coord, dir);
      // remove from shipsToPlace
      p1ShipsToPlace.splice(shipIndex, 1);

      // all ships placed? switch to attack phase of game
      if (p1ShipsToPlace.length === 0 && p2ShipsToPlace.length === 0) {
        phase = 'attack';
      }

      return true;
    } catch (error) {
      // TODO: pass error.message instead of console.logging?
      console.log(`Your ship could not be placed.`);
      console.log(error.message);
      console.log(`Try again.`);
      return false;
    }
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
    placePlayerShip,
    switchTurn,
    whoseTurn,
    playTurn,
  };

  
}

export default Game;