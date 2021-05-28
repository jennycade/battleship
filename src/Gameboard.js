// import Ship from './Ship';

const Gameboard = () => {
  const board = {
    a1: null,
    a2: null,
  }

  const placeShip = (ship) => {

  }

  const query = (coord, who) => {
    // show hit or miss to self or opponent
    if (who === 'self') {
      // show what ships are there
      return board[coord];
    }
  }

  return { placeShip, query };
}

export default Gameboard;