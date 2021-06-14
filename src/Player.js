import { shuffle } from './Helpers';

const Player = (type, ownGameboard, oppGameboard) => {
  let attackedCoords = [];
  const allCoords = oppGameboard.getCoords();
  let remainingCoords = [...allCoords];

  const placeShip = (ship, coord, dir) => {
    ownGameboard.placeShip(ship, coord, dir);
  }

  const randomlyPlaceShip = (ship) => {
    // keep track of how many tries it takes
    let tries = 0;
    // pick a random coordinate (shuffle coords and iterate over)
    let coords = [...ownGameboard.getCoords()];
    coords = shuffle(coords);

    for (let i=0; i<coords.length; i++) {
      // pick a random direction (shuffle directions and iterate over)
      let dirs = ['up', 'down', 'left', 'right'];
      dirs = shuffle(dirs);
      for (let j=0; j<dirs.length; j++) {
        // Gameboard.placeShip throws an error if any peg:
        // 1. doesn't exist
        // 2. is already occupied by a ship

        try {
          placeShip(ship, coords[i], dirs[j]);
          return (coords[i], dirs[i]);
        } catch (error) {
            // coordinate/direction pair didn't work
            // keep track of the number of tries?
            tries++;
        }
        // no? try a new direction
      }
      // still no? try a new coordinate
    }

    throw new Error(`AI failed to place ship after ${tries+1} tries`);
  }

  const placeFleet = (ships) => {
    let tries = 0;

    while (tries < 100) {
      try {
        tries++;
        for (let i=0; i<ships.length; i++) {
          randomlyPlaceShip(ships[i]);
        }
        return true;
      } catch (error) {
        // clear the gameboard
        ownGameboard.clearBoard();
      }
    }

    if (tries >= 100) {
      throw new Error(`AI couldn't place ships after ${tries} tries. Try using fewer ships or a larger gameboard.`)
      // This succeeds more and quicker than expected! What's going on?
    }
    
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
    placeFleet: type==='ai' ? placeFleet : null,
  }
}

export default Player;