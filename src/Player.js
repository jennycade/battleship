import { boardGenerator } from './Helpers';

const Player = (ownGameboard, oppGameboard) => {
  let attackedCoords = [];
  const allCoords = oppGameboard.getCoords();
  let remainingCoords = [...allCoords];

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
    // remove from remainingCoords

    return randomCoord;
  }

  return { attack, randomAttack };
}

export default Player;