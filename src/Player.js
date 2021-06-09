import { shuffle } from './Helpers';

const Player = (type, ownGameboard, oppGameboard) => {
  let attackedCoords = [];
  const allCoords = oppGameboard.getCoords();
  let remainingCoords = [...allCoords];

  const placeShip = (ship, coord, dir) => {
    ownGameboard.placeShip(ship, coord, dir);
  }

  const randomlyPlaceShip = (ship) => {
    // pick a random coordinate (shuffle coords and iterate over)
    let coords = [...ownGameboard.getCoords()];
    coords = shuffle(coords);

    for (let i=0; i<coords.length; i++) {
      // pick a random direction (shuffle directions and iterate over)
      let dirs = ['up', 'down', 'left', 'right'];
      dirs = shuffle(dirs);
      for (let j=0; j<dirs.length; j++) {
        // check to make sure all pegs:
        // 1. exist
        // 2. aren't already occupied by a ship
        // OR write some error-throwing in Gameboard.placeShip() and catch it here.

        // yes? placeShip()
        // console.log('Trying to place a ship');
        // console.log(`coord: ${coords[i]}`);
        // console.log(`direction: ${dirs[j]}`);
        placeShip(ship, coords[i], dirs[j]);

        return (coords[i], dirs[i]);

        // no? try a new direction
      }

      

      // still no? try a new coordinate
    }

    // throw new Error('Ships cannot be placed');
  }

  const attack = (coord) => {
    oppGameboard.receiveAttack(coord);
  }

  const randomAttack = () => {
    // pick a coordinate
    const randomi = Math.floor(Math.random() * remainingCoords.length);
    const randomCoord = remainingCoords[randomi];

    // attack!
    attack(randomCoord);

    // add to attackedCoords
    attackedCoords.push(randomCoord);

    // remove from remainingCoords
    remainingCoords.splice(randomi, 1);

    return randomCoord;
  }

  return {
    attack: type==='human' ? attack : randomAttack,
    placeShip: type==='human' ? placeShip : randomlyPlaceShip,
  }
}

export default Player;