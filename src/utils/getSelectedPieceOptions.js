// pice show moves option
export const checkMovesOptionsQueen = (piece, currRow, currCol, setState) => {
  if (piece.type !== "queen") {
    return;
  }
  let array = [];

  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      if (currRow - row === col - currCol) array.push(`${row},${col}`);
      if (row - currRow === currCol - col) array.push(`${row},${col}`);
      if (currRow - row === currCol - col) array.push(`${row},${col}`);
      if (row - currRow === col - currCol) array.push(`${row},${col}`);
      if (currRow === row) array.push(`${row},${col}`);
      if (currCol === col) array.push(`${row},${col}`);
    }
  }

  const filteredArray = array.filter(
    (item, index) =>
      item !== `${currRow},${currCol}` && array.indexOf(item) === index
  );

  if (typeof setState === "function") {
    setState(filteredArray);
  }
};
