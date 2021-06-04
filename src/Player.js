import { boardGenerator } from './Helpers';

const Player = (type, ownGameboard, oppGameboard) => {
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
    attackedCoords.push(randomCoord);

    // remove from remainingCoords
    remainingCoords.splice(randomi, 1);

    return randomCoord;
  }

  if (type === 'human') {
    return { attack };
  }
  if (type === 'ai') {
    return { attack: randomAttack };
  }
}

export default Player;