import { boardGenerator } from './Helpers';

const Player = (ownGameboard, oppGameboard) => {
  let attackCoords = [];
  const allCoords = boardGenerator()

  const attack = (coord) => {
    oppGameboard.receiveAttack(coord);
  }

  const randomAttack = () => {
    // 
  }

  return { attack, randomAttack };
}

export default Player;