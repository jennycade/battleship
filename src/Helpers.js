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