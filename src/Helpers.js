
const alpha = 'abcdefghijklmnopqrstuvwxyz';

export function sum (arr) {
  return arr.reduce((total, value) => total + value, 0);
}

export function boardGenerator(size) {
  if (size > 26) {
    // default to max size 26 x 26
    size = 26;
  }
  const alpha = 'abcdefghijklmnopqrstuvwxyz';
  let board = {};
  for (let i=0; i<size; i++) {
    const letter = alpha.slice(i, (i)+1);
    // number
    for (let j=1; j<=size; j++) {
      board[`${letter}${j}`] = {
        ship: null,
        pos: null,
        hit: '',
      };
    }
  }

  return board;
}

export function parseCoord(coord) {
  // returns array: [letterStr, numberInt]
  const pattern = /(?<letter>[a-z]+)(?<number>\d+)/mg
  const matches = pattern.exec(coord);
  return [
    matches['groups']['letter'],
    parseInt(matches['groups']['number']),
  ];
}

export function moveOnePeg(coord, dir) {

  const [letter, num] = parseCoord(coord);
  let [newLetter, newNum] = [letter, num];

  if (dir === 'down') {
    newNum = num + 1;
  }
  if (dir === 'up') {
    newNum = num - 1;
  }

  
  if (dir === 'right') {
    // next letter?
    newLetter = numToAlpha(alphaToNum(letter) + 1);
  }
  if (dir === 'left') {
    newLetter = numToAlpha(alphaToNum(letter) - 1);
  }

  return `${newLetter}${newNum}`;
}

export function alphaToNum(str) {
  return alpha.indexOf(str) + 1
}

export function numToAlpha(num) {
  return alpha.slice(num-1, num);
}