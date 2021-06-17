import Gameboard from "./Gameboard";
import Player from './Player';
import Ship from './Ship';

const Game = (size, ships = null) => {
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

  let winner = '';

  const createFleets = (shipSizes = [2, 3, 3, 4, 5]) => {

    // wipe the fleets first
    p1ShipsToPlace = [];
    p2ShipsToPlace = [];

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

  // create fleets at game init
  if (ships) {
    createFleets(ships);
  } else {
    createFleets();
  }

  const getPhase = () => phase;

  const getShipsToPlace = () => {
    return p1ShipsToPlace.map(ship => ship.pegs.length);
  }

  const placePlayerShip = (shipSize, coord, dir) => {
    // throw an error if it's not the placement phase
    if (phase !== 'placement') {
      throw new Error(`Ship placement is not allowed during the ${phase} phase.`);
    }

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
      if (error instanceof TypeError) {
        // if there's no ship, placeShip throws a TypeError when trying to access the pegs array.
        console.log(`There is no ship of length ${shipSize} to be placed.`);
      } else {
        // other errors from Gameboard.placeShip:
        // - one or more pegs are not valid
        // - one or more pegs are already occupied by another ship.
        console.log(error.message);
      }
      console.log(`Try again.`);
      return false;
    }
  }

  // TODO: unPlacePlayerShip() ?

  const getHitBoards = () => {
    return [gb1.getHitBoard(), gb2.getHitBoard()];
  }

  const getShipBoard = () => {
    // p1 only
    return gb1.getShipBoard();
  }


  const switchTurn = () => {
    if (turn === p1) {
      turn = p2;
    } else {
      turn = p1;
    }
  }

  const declareWinner = (player) => {
    winner = player;
    phase = 'end';
  }

  const getWinner = () => { return winner; }

  const whoseTurn = () => {
    return turn;
  }

  const playTurn = (coord, verbose = false) => {
    // throw an error if it's not the attack phase
    if (phase !== 'attack') {
      throw new Error(`Attacking is not allowed during the ${phase} phase.`)
    }

    // TODO: Verify coordinate first
    // human attacks coordinate
    p1.attack(coord);

    // check to see if the human won
    if (gb2.areAllShipsSunk()) {
      declareWinner('p1');
      return true;
    }

    // switch turn to ai
    turn = p2;

    // TODO: wait a second? (or render a wait time?)
    
    // ai attacks human
    const randomCoord = p2.attack();
    
    // check to see if ai won
    if (gb1.areAllShipsSunk()) {
      declareWinner('p2');
      return true;
    }

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
    getShipsToPlace,
    getHitBoards,
    getShipBoard,
    getPhase,
    placePlayerShip,
    switchTurn,
    whoseTurn,
    playTurn,
    getWinner,
  };

  
}

export default Game;