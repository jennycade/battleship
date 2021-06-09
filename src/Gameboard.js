// import Ship from './Ship';
import { boardGenerator, moveOnePeg, parseCoord } from './Helpers';

const Gameboard = (size) => {
  const coords = boardGenerator(size);
  let board = {}
  for (let i=0; i<coords.length; i++) {
    board[coords[i]] = {
      ship: null,
      pos: null,
      hit: '',
    }
  }

  let ships = [];

  const placeShip = (ship, coord, dir) => {
    // add to ships
    ships = [...ships, ship];

    // calculate spots
    const numPegs = ship.pegs.length;
    let peg = coord;

    let pegs = [];
    for (let i=0; i<numPegs; i++) {
      pegs.push(peg);
      // verify coordinate
      if (!verifyCoord(peg)) {
        throw new Error(`${peg} is not a valid coordinate`);
      }
      // check for a ship
      if (board[pegs[i]].ship !== null) {
        throw new Error(`Trying to place a ship where another ship already exists at coord ${peg}`);
      }

      peg = moveOnePeg(peg, dir);
    }

    for (let i=0; i<numPegs; i++) {
      // assign ship
      board[pegs[i]] = {
        ship,
        pos: i,
        hit: '',
      }
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

  const getCoords = () => {
    return coords;
  }

  const verifyCoord = (coord) => { // TODO: Use this!
    return coords.includes(coord);
  }

  const query = (coord, who) => {
    // show hit or miss to self or opponent
    if (who === 'self') {
      // show what ships are there
      return board[coord];
    }
    // else filter out ships but show hits and misses
    return {
      hit: board[coord].hit,
    }
  }

  const getBoard = () => {
    return board;
  }

  const getHitBoard = () => {
    let result = {};
    for (const coord in board) {
      result[coord] = board[coord].hit;
    }
    return result;
  }

  const printBoard = () => {
    // console.table(board);
    let str = '';
    for (const coord in board) {
      if (parseCoord(coord)[0] === 'a') {
        // new row
        str += '\n'
      }
      const hit = board[coord].hit;
      if (hit === '') {
        str += '.';
      } else if (hit === 'hit') {
        str += 'X';
      } else if (hit === 'miss') {
        str += 'O';
      } else {
        str += hit;
      }
    }
    return str;
  }

  return {
    placeShip, 
    receiveAttack,
    areAllShipsSunk,
    query, verifyCoord, 
    getCoords, getBoard,
    printBoard,
    getHitBoard,
  };
}

export default Gameboard;