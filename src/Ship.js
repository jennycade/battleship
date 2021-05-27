import { sum } from './Helpers';

const Ship = (numPegs) => {
  let pegs = []
  for (let i=0; i<numPegs; i++) {
    pegs.push(0);
  }

  const hit = (num) => {
    pegs[num] = 1;
  }

  const isSunk = () => {
    return sum(pegs) === numPegs;
  }

  return { pegs, hit, isSunk }
}

export default Ship;