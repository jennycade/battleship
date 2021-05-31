// import Ship from './Ship';
import { boardGenerator, moveOnePeg } from './Helpers';

const Gameboard = (size) => {
  const board = boardGenerator(size);
  let ships = [];

  const placeShip = (ship, coord, dir) => {
    // add to ships
    ships = [...ships, ship];

    // calculate spots
    const numPegs = ship.pegs.length;
    let peg = coord;
    // TODO: Consider checking that each peg exists before starting to assign the ship.
    for (let i=0; i<numPegs; i++) {
      // assign ship
      board[peg] = {
        ship,
        pos: i,
        hit: '',
      }
      // set coordinate for next peg that the ship goes in
      peg = moveOnePeg(peg, dir);
    }
  }

  const receiveAttack = (coord) => {
    if (board[coord].hit !== '') {
      throw new Error(`Coordinate ${coord} has already been hit. Pick a new coordinate.`);
    }
    if (board[coord].ship) {
      // sends a hit through
      board[coord].ship.hit(board[coord].pos);

      // marks board position as hit
      board[coord].hit = 'hit';
    } else {
      board[coord].hit = 'miss';
    }
    
  }

  const areAllShipsSunk = () => {
    if (ships.length === 0) {
      throw new Error('No ships have been placed.');
    }
    for (let i=0; i<ships.length; i++) {
      if (ships[i].isSunk() === false) {
        return false;
      }
    }
    return true;
  }

  const verifyCoord = (coord) => { // TODO: Use this!
    return Object.keys(board).includes(coord);
  }

  const query = (coord, who) => {
    // show hit or miss to self or opponent
    if (who === 'self') {
      // show what ships are there
      return board[coord];
    }
    // else filter out ships but show hits and misses
  }

  return {
    placeShip, 
    receiveAttack,
    areAllShipsSunk,
    query, verifyCoord
  };
}

export default Gameboard;