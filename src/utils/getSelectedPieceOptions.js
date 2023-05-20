// pice show moves option
export const checkMovesOptionsPawn = (
  piece,
  currRow,
  currCol,
  setState,
  nextPos = false,
  currentBoard
) => {
  if (piece.type !== "pawn") {
    return;
  }
  let array = [];

  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      if (nextPos) {
        if (piece.color === "black") {
          if (currRow - row === 1 && currCol - col === 1)
            array.push(`${row},${col}`);
          if (currRow - row === 1 && col - currCol === 1)
            array.push(`${row},${col}`);
        }

        if (piece.color === "white") {
          if (row - currRow === 1 && currCol - col === 1)
            array.push(`${row},${col}`);
          if (row - currRow === 1 && col - currCol === 1)
            array.push(`${row},${col}`);
        }
      } else if (!nextPos) {
        // check if pawn is at first position, let him move 2
        if (piece.color === "black") {
          if (piece.startPosition && currCol - col === 0 && currRow - row === 1)
            array.push(`${row},${col}`);
          if (piece.startPosition && currCol - col === 0 && currRow - row === 2)
            array.push(`${row},${col}`);
          if (
            !piece.startPosition &&
            currRow - row === 1 &&
            currCol - col === 0
          )
            array.push(`${row},${col}`);
        }

        if (piece.color === "white") {
          if (piece.startPosition && row - currRow === 1 && currCol - col === 0)
            array.push(`${row},${col}`);
          if (piece.startPosition && row - currRow === 2 && currCol - col === 0)
            array.push(`${row},${col}`);
          if (
            !piece.startPosition &&
            row - currRow === 1 &&
            currCol - col === 0
          )
            array.push(`${row},${col}`);
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

export const checkMovesOptionsBishop = (
  piece,
  currRow,
  currCol,
  setState,
  currentBoard
) => {
  if (piece.type !== "bishop") {
    return;
  }
  let array = [];

  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      // Check if the queen can move diagonally
      if (Math.abs(currRow - row) === Math.abs(currCol - col)) {
        let pieceInTheWay = false;
        let nextRow = currRow;
        let nextCol = currCol;
        // check diagonally positions
        while (nextRow !== row && nextCol !== col) {
          if (nextRow < row) {
            nextRow++;
          } else {
            nextRow--;
          }

          if (nextCol < col) {
            nextCol++;
          } else {
            nextCol--;
          }
          if (currentBoard[nextRow - 1][nextCol - 1] !== null) {
            pieceInTheWay = true;
            break;
          }
        }
        if (!pieceInTheWay) {
          array.push(`${row},${col}`);
          console.log(array);
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

export const checkMovesOptionsKnight = (
  piece,
  currRow,
  currCol,
  setState,
  currentBoard
) => {
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

export const checkMovesOptionsRook = (
  piece,
  currRow,
  currCol,
  setState,
  currentBoard
) => {
  if (piece.type !== "rook") {
    return;
  }
  let array = [];

  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      // Check if the queen can move vertically or horizontally
      if (row === currRow || col === currCol) {
        let pieceInTheWay = false;

        // Check vertically
        if (row !== currRow) {
          let stepRow = currRow < row ? currRow + 1 : currRow - 1;

          while (stepRow !== row) {
            if (currentBoard[stepRow - 1][currCol - 1] !== null) {
              pieceInTheWay = true;
              break;
            }

            stepRow = currRow < row ? stepRow + 1 : stepRow - 1;
          }
        }

        // Check horizontally
        if (col !== currCol && !pieceInTheWay) {
          let stepCol = currCol < col ? currCol + 1 : currCol - 1;

          while (stepCol !== col) {
            if (currentBoard[currRow - 1][stepCol - 1] !== null) {
              pieceInTheWay = true;
              break;
            }

            stepCol = currCol < col ? stepCol + 1 : stepCol - 1;
          }
        }

        if (!pieceInTheWay && currentBoard[row - 1][col - 1] === null) {
          array.push(`${row},${col}`);
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

export const checkMovesOptionsQueen = (
  piece,
  currRow,
  currCol,
  setState,
  currentBoard
) => {
  if (piece.type !== "queen") {
    return;
  }
  let array = [];
  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      // Check if the queen can move vertically or horizontally
      if (row === currRow || col === currCol) {
        let pieceInTheWay = false;

        // Check vertically
        if (row !== currRow) {
          let stepRow = currRow < row ? currRow + 1 : currRow - 1;

          while (stepRow !== row) {
            if (currentBoard[stepRow - 1][currCol - 1] !== null) {
              pieceInTheWay = true;
              break;
            }

            stepRow = currRow < row ? stepRow + 1 : stepRow - 1;
          }
        }

        // Check horizontally
        if (col !== currCol && !pieceInTheWay) {
          let stepCol = currCol < col ? currCol + 1 : currCol - 1;

          while (stepCol !== col) {
            if (currentBoard[currRow - 1][stepCol - 1] !== null) {
              pieceInTheWay = true;
              break;
            }

            stepCol = currCol < col ? stepCol + 1 : stepCol - 1;
          }
        }

        if (!pieceInTheWay && currentBoard[row - 1][col - 1] === null) {
          array.push(`${row},${col}`);
        }
      }

      // Check if the queen can move diagonally
      if (Math.abs(currRow - row) === Math.abs(currCol - col)) {
        let pieceInTheWay = false;
        let nextRow = currRow;
        let nextCol = currCol;
        // check diagonally positions
        while (nextRow !== row && nextCol !== col) {
          if (nextRow < row) {
            nextRow++;
          } else {
            nextRow--;
          }

          if (nextCol < col) {
            nextCol++;
          } else {
            nextCol--;
          }
          if (currentBoard[nextRow - 1][nextCol - 1] !== null) {
            pieceInTheWay = true;
            break;
          }
        }
        if (!pieceInTheWay) {
          array.push(`${row},${col}`);
          console.log(array);
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
    console.log(filteredArray);
  }
};

export const checkMovesOptionsKing = (
  piece,
  currRow,
  currCol,
  setState,
  currentBoard
) => {
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
