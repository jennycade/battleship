// import Ship from './Ship';
import { boardGenerator, moveOnePeg } from './Helpers';

const Gameboard = (size) => {
  const board = boardGenerator(size);

  const placeShip = (ship, coord, dir) => {
    // calculate spots
    const numPegs = ship.pegs.length;
    let peg = coord;
    // TODO: Consider checking that each peg exists before starting to assign the ship.
    for (let i=0; i<numPegs; i++) {
      // assign ship
      board[peg] = {
        ship,
        pos: i,
      }
      // set coordinate for next peg that the ship goes in
      peg = moveOnePeg(peg, dir);
    }
  }

  const receiveAttack = (coord) => {
    if (board[coord].ship) {
      // sends a hit through
      board[coord].ship.hit(board[coord].pos);

      // marks board position as hit
      board[coord].hit = 'hit';
    } else {
      board[coord].hit = 'miss';
    }
    
  }

  const verifyCoord = (coord) => {
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
    query, verifyCoord
  };
}

export default Gameboard;