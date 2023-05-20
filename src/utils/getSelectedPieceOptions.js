// pice show moves option
export const checkMovesOptionsPawn = (
  piece,
  currRow,
  currCol,
  setState,
  nextPos
) => {
  if (piece.type !== "pawn") {
    return;
  }
  let array = [];

  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      if (nextPos) {
        if (piece.color === "black") {
          if (
            currRow - row === 1 &&
            (currCol - col === 1 || col - currCol === 1)
          ) {
            array.push(`${row},${col}`);
          }
          console.log("not an available move for pawn");
          return;
        }

        if (piece.color === "white") {
          if (
            row - currRow === 1 &&
            (currCol - col === 1 || col - currCol === 1)
          ) {
            array.push(`${row},${col}`);
          }
          console.log("not an available move for pawn");
          return;
        }
      } else if (!nextPos) {
        // check if pawn is at first position, let him move 2
        if (piece.color === "black") {
          if (
            piece.startPosition &&
            (currRow - row === 1 || currRow - row === 2) &&
            currCol - col === 0
          ) {
            array.push(`${row},${col}`);
          } else if (
            !piece.startPosition &&
            currRow - row === 1 &&
            currCol - col === 0
          ) {
            array.push(`${row},${col}`);
          }
        }

        if (piece.color === "white") {
          if (
            piece.startPosition &&
            (row - currRow === 1 || row - currRow === 2) &&
            currCol - col === 0
          ) {
            array.push(`${row},${col}`);
          } else if (
            !piece.startPosition &&
            row - currRow === 1 &&
            currCol - col === 0
          ) {
            array.push(`${row},${col}`);
          }
        }
      }
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

export const checkMovesOptionsBishop = (piece, currRow, currCol, setState) => {
  if (piece.type !== "bishop") {
    return;
  }
  let array = [];

  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      if (currRow - row === col - currCol) array.push(`${row},${col}`);
      if (row - currRow === currCol - col) array.push(`${row},${col}`);
      if (currRow - row === currCol - col) array.push(`${row},${col}`);
      if (row - currRow === col - currCol) array.push(`${row},${col}`);
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

export const checkMovesOptionsKnight = (piece, currRow, currCol, setState) => {
  if (piece.type !== "knight") {
    return;
  }
  let array = [];

  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      if (currRow - row === 2 && col - currCol === 1)
        array.push(`${row},${col}`);
      if (currRow - row === 1 && col - currCol === 2)
        array.push(`${row},${col}`);
      if (row - currRow === 1 && col - currCol === 2)
        array.push(`${row},${col}`);
      if (row - currRow === 2 && col - currCol === 1)
        array.push(`${row},${col}`);
      if (row - currRow === 2 && currCol - col === 1)
        array.push(`${row},${col}`);
      if (row - currRow === 1 && currCol - col === 2)
        array.push(`${row},${col}`);
      if (currRow - row === 1 && currCol - col === 2)
        array.push(`${row},${col}`);
      if (currRow - row === 2 && currCol - col === 1)
        array.push(`${row},${col}`);
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

export const checkMovesOptionsRook = (piece, currRow, currCol, setState) => {
  if (piece.type !== "rook") {
    return;
  }
  let array = [];

  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
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

export const checkMovesOptionsKing = (piece, currRow, currCol, setState) => {
  if (piece.type !== "king") {
    return;
  }
  let array = [];

  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      // horizontaly
      if (currRow - row === 1 && col === currCol) array.push(`${row},${col}`);
      if (row - currRow === 1 && col === currCol) array.push(`${row},${col}`);
      // vertically
      if (row === currRow && currCol - col === 1) array.push(`${row},${col}`);
      if (row === currRow && col - currCol === 1) array.push(`${row},${col}`);
      // diagonal
      if (row - currRow === 1 && currCol - col === 1)
        array.push(`${row},${col}`);
      if (currRow - row === 1 && col - currCol === 1)
        array.push(`${row},${col}`);
      if (currRow - row === 1 && currCol - col === 1)
        array.push(`${row},${col}`);
      if (row - currRow === 1 && col - currCol === 1)
        array.push(`${row},${col}`);
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
