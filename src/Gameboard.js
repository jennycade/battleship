// import Ship from './Ship';
import { boardGenerator, moveOnePeg } from './Helpers';

const Gameboard = (size) => {
  const board = boardGenerator(size);

  const placeShip = (ship, coord, dir) => {
    // calculate spots
    const numPegs = ship.pegs.length;
    let peg = coord;
    for (let i=0; i<numPegs; i++) {
      // assign ship
      board[peg] = {
        ship,
        pos: i,
      }
      // find coordinate for next peg that the ship goes in
      peg = moveOnePeg(peg, dir);
    }
  }

  const query = (coord, who) => {
    // show hit or miss to self or opponent
    if (who === 'self') {
      // show what ships are there
      return board[coord];
    }
    // else filter out ships but show hits and misses
  }

  return { placeShip, query };
}

export default Gameboard;