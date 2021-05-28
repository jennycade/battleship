
const alpha = 'abcdefghijklmnopqrstuvwxyz';

export function sum (arr) {
  return arr.reduce((total, value) => total + value, 0);
}

export function boardGenerator(size) {
  const alpha = 'abcdefghijklmnopqrstuvwxyz';
  let board = {};
  for (let i=0; i<size; i++) {
    let letterpos = i;
    let letter = '';
    // letter
    while (letterpos >= 0) {
      letter += alpha.slice(letterpos%26, (letterpos%26)+1);
      letterpos -= 26;
    }
    // number
    for (let j=1; j<=size; j++) {
      board[`${letter}${j}`] = '';
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

  let prefix = '';
  let l = '';
  if (letter.length === 1) {
    l = letter;
  } else {
    const last = letter.length-1
    prefix = letter.slice(0, last);
    l = letter[last];
  }
  if (dir === 'right') {
    // next letter?
    newLetter = prefix + alpha[alpha.indexOf(l) + 1];
  }
  if (dir === 'left') {
    newLetter = prefix + alpha[alpha.indexOf(l) - 1];
  }

  return `${newLetter}${newNum}`;
}

export function alphaToNum(str) {
  // each character is a digit representing 1–26
  // split into characters
  let decimal = 0;
  for (let i=0; i<str.length; i++) {
    const power = str.length - i - 1;
    decimal += (alpha.indexOf(str[i]) + 1) * 26**power;
  }

  return decimal;
}