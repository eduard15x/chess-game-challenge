// pice show moves option
const checkAvailableMovesPawn = (
  piece,
  currRow,
  currCol,
  setState,
  currentBoard
) => {
  let array = [];

  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      if (piece.color === "black") {
        if (currRow - row === 1 && Math.abs(currCol - col) === 1) {
          const targetPiece = currentBoard[row - 1][col - 1];
          if (targetPiece && targetPiece.color !== piece.color) {
            array.push(`${row},${col}`);
          }
        }
      }

      if (piece.color === "white") {
        if (row - currRow === 1 && Math.abs(currCol - col) === 1) {
          const targetPiece = currentBoard[row - 1][col - 1];
          if (targetPiece && targetPiece.color !== piece.color) {
            array.push(`${row},${col}`);
          }
        }
      }
      // check if pawn is at first position, let him move 2
      if (piece.color === "black") {
        if (
          piece.startPosition &&
          currCol - col === 0 &&
          currRow - row === 1 &&
          !currentBoard[row - 1][col - 1]
        )
          array.push(`${row},${col}`);
        if (
          piece.startPosition &&
          currCol - col === 0 &&
          currRow - row === 2 &&
          !currentBoard[row - 1][col - 1] &&
          !currentBoard[row][col - 1]
        )
          array.push(`${row},${col}`);
        if (
          !piece.startPosition &&
          currRow - row === 1 &&
          currCol - col === 0 &&
          !currentBoard[row - 1][col - 1] // check target position if empty
        )
          array.push(`${row},${col}`);
      }

      if (piece.color === "white") {
        if (
          piece.startPosition &&
          row - currRow === 1 &&
          currCol - col === 0 &&
          !currentBoard[row - 1][col - 1]
        )
          array.push(`${row},${col}`);
        if (
          piece.startPosition &&
          row - currRow === 2 &&
          currCol - col === 0 &&
          !currentBoard[row - 1][col - 1] &&
          !currentBoard[row - 2][col - 1]
        )
          array.push(`${row},${col}`);
        if (
          !piece.startPosition &&
          row - currRow === 1 &&
          currCol - col === 0 &&
          !currentBoard[row - 1][col - 1] // check target position if empty
        )
          array.push(`${row},${col}`);
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

const checkAvailableMovesBishop = (
  piece,
  currRow,
  currCol,
  setState,
  currentBoard
) => {
  let array = [];

  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      // Check if the queen can move diagonally
      if (Math.abs(currRow - row) === Math.abs(currCol - col)) {
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
            break;
          }
        }

        // Check if the final position is occupied by an opponent's piece
        if (nextRow === row && nextCol === col) {
          if (
            currentBoard[nextRow - 1][nextCol - 1] !== null &&
            currentBoard[nextRow - 1][nextCol - 1].color !== piece.color
          ) {
            array.push(`${row},${col}`);
          } else if (currentBoard[nextRow - 1][nextCol - 1] === null) {
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

const checkAvailableMovesKnight = (
  piece,
  currRow,
  currCol,
  setState,
  currentBoard
) => {
  let array = [];

  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      // Calculate the difference in rows and columns
      const diffRow = Math.abs(currRow - row);
      const diffCol = Math.abs(currCol - col);

      // Check if the move is a valid knight move
      if (
        (diffRow === 2 && diffCol === 1) ||
        (diffRow === 1 && diffCol === 2)
      ) {
        const targetPiece = currentBoard[row - 1][col - 1];
        if (targetPiece === null || targetPiece.color !== piece.color) {
          // Add the valid move to the array
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

const checkAvailableMovesRook = (
  piece,
  currRow,
  currCol,
  setState,
  currentBoard
) => {
  let array = [];

  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      // Check if the rook can move vertically or horizontally
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
        } else if (
          !pieceInTheWay &&
          currentBoard[row - 1][col - 1]?.color !== piece.color
        ) {
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

const checkAvailableMovesQueen = (
  piece,
  currRow,
  currCol,
  setState,
  currentBoard
) => {
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
        } else if (
          !pieceInTheWay &&
          currentBoard[row - 1][col - 1]?.color !== piece.color
        ) {
          array.push(`${row},${col}`);
        }
      }

      // Check if the queen can move diagonally
      if (Math.abs(currRow - row) === Math.abs(currCol - col)) {
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
            break;
          }
        }
        // Check if the final position is occupied by an opponent's piece
        if (nextRow === row && nextCol === col) {
          if (
            currentBoard[nextRow - 1][nextCol - 1] !== null &&
            currentBoard[nextRow - 1][nextCol - 1].color !== piece.color
          ) {
            array.push(`${row},${col}`);
          } else if (currentBoard[nextRow - 1][nextCol - 1] === null) {
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
    console.log(filteredArray);
  }
};

const checkAvailableMovesKing = (
  piece,
  currRow,
  currCol,
  setState,
  currentBoard
) => {
  let array = [];

  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      const targetPiece = currentBoard[row - 1][col - 1];
      if (
        Math.abs(currRow - row) <= 1 &&
        Math.abs(currCol - col) <= 1 && // horizontally, vertically, and diagonally adjacent positions
        !(currRow === row && currCol === col) && // exclude the current position
        (!targetPiece || targetPiece.color !== piece.color) &&
        !isPositionBetweenKings(currRow, currCol, row, col, currentBoard) // exclude positions with 1 square between other kings) // exclude positions with the same piece color
      ) {
        array.push(`${row},${col}`);
      }
    }
  }

  function isPositionBetweenKings(
    currRow,
    currCol,
    targetRow,
    targetCol,
    currentBoard
  ) {
    // Check for kings in the 3x3 grid centered at the target position
    for (let row = targetRow - 1; row <= targetRow + 1; row++) {
      for (let col = targetCol - 1; col <= targetCol + 1; col++) {
        if (
          row >= 1 && // check if the position is within the board boundaries
          row <= 8 &&
          row >= 1 &&
          row <= 8 &&
          (row !== currRow || col !== currCol) && // exclude the current king position
          currentBoard[row - 1][col - 1]?.type === "king" // check if there is a king at the position
        ) {
          return true; // position has a king between the current king and the target position
        }
      }
    }
    return false; // no king found between the current king and the target position
  }

  const filteredArray = array.filter(
    (item, index) =>
      item !== `${currRow},${currCol}` && array.indexOf(item) === index
  );

  if (typeof setState === "function") {
    setState(filteredArray);
  }
};

export const checkMovesOptions = (
  piece,
  currRow,
  currCol,
  setState,
  currentBoard
) => {
  switch (piece.type) {
    case "pawn":
      checkAvailableMovesPawn(piece, currRow, currCol, setState, currentBoard);
      break;
    case "bishop":
      checkAvailableMovesBishop(
        piece,
        currRow,
        currCol,
        setState,
        currentBoard
      );
      break;
    case "knight":
      checkAvailableMovesKnight(
        piece,
        currRow,
        currCol,
        setState,
        currentBoard
      );
      break;
    case "rook":
      checkAvailableMovesRook(piece, currRow, currCol, setState, currentBoard);
      break;
    case "queen":
      checkAvailableMovesQueen(piece, currRow, currCol, setState, currentBoard);
      break;
    case "king":
      checkAvailableMovesKing(piece, currRow, currCol, setState, currentBoard);
      break;
    default:
      break;
  }
};
