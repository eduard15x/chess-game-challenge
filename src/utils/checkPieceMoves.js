// piece check moves
export const checkMoveAvailablePawn = (
  piece,
  currRow,
  currCol,
  nextPos,
  setRow,
  setCol
) => {
  if (piece.type !== "pawn") {
    return false;
  }
  if (nextPos) {
    if (piece.color === "black") {
      if (
        currRow - setRow === 1 &&
        (currCol - setCol === 1 || setCol - currCol === 1)
      ) {
        console.log("piece taken, move available");
        return true;
      }
      console.log("not an available move for pawn");
      return;
    }

    if (piece.color === "white") {
      if (
        setRow - currRow === 1 &&
        (currCol - setCol === 1 || setCol - currCol === 1)
      ) {
        console.log("piece taken, move available");
        return true;
      }
      console.log("not an available move for pawn");
      return;
    }
  } else if (!nextPos) {
    // check if pawn is at first position, let him move 2
    if (piece.color === "black") {
      if (
        piece.startPosition &&
        (currRow - setRow === 1 || currRow - setRow === 2) &&
        currCol - setCol === 0
      ) {
        console.log("piece in start position, available 1 or 2 square");
        return true;
      } else if (
        !piece.startPosition &&
        currRow - setRow === 1 &&
        currCol - setCol === 0
      ) {
        console.log("piece not in start position, available 1 square forward");
        return true;
      }
    }

    if (piece.color === "white") {
      if (
        piece.startPosition &&
        (setRow - currRow === 1 || setRow - currRow === 2) &&
        currCol - setCol === 0
      ) {
        console.log("piece in start position, available 1 or 2 square");
        return true;
      } else if (
        !piece.startPosition &&
        setRow - currRow === 1 &&
        currCol - setCol === 0
      ) {
        console.log("piece not in start position, available 1 square forward");
        return true;
      }
    }
  }
  console.log("not an available move for pawn");
  return false;
};

export const checkMoveAvailableBishop = (
  piece,
  currRow,
  currCol,
  setRow,
  setCol
) => {
  if (piece.type !== "bishop") {
    return false;
  }
  if (
    currRow - setRow === setCol - currCol ||
    setRow - currRow === currCol - setCol ||
    currRow - setRow === currCol - setCol ||
    setRow - currRow === setCol - currCol
  ) {
    console.log("available - bishop");
    return true;
  } else {
    console.log("not an available move for bishop");
    return false;
  }
};

export const checkMoveAvailableKnight = (
  piece,
  currRow,
  currCol,
  setRow,
  setCol
) => {
  if (piece.type !== "knight") {
    return false;
  }
  if (
    // clock order
    (currRow - setRow === 2 && setCol - currCol === 1) ||
    (currRow - setRow === 1 && setCol - currCol === 2) ||
    (setRow - currRow === 1 && setCol - currCol === 2) ||
    (setRow - currRow === 2 && setCol - currCol === 1) ||
    (setRow - currRow === 2 && currCol - setCol === 1) ||
    (setRow - currRow === 1 && currCol - setCol === 2) ||
    (currRow - setRow === 1 && currCol - setCol === 2) ||
    (currRow - setRow === 2 && currCol - setCol === 1)
  ) {
    console.log("available - knight");
    return true;
  } else {
    console.log("not an available move for knight");
    return false;
  }
};

export const checkMoveAvailableQueen = (
  piece,
  currRow,
  currCol,
  setRow,
  setCol
) => {
  if (piece.type !== "queen") {
    return false;
  }

  // let array = [];
  // for (let row = 1; row <= 8; row++) {
  //   for (let col = 1; col <= 8; col++) {
  //     if (currRow - row === col - currCol) array.push(`${row},${col}`);
  //     if (row - currRow === currCol - col) array.push(`${row},${col}`);
  //     if (currRow - row === currCol - col) array.push(`${row},${col}`);
  //     if (row - currRow === col - currCol) array.push(`${row},${col}`);
  //     if (currRow === row) array.push(`${row},${col}`);
  //     if (currCol === col) array.push(`${row},${col}`);
  //   }
  // }

  // const xxx = array.filter(
  //   (item, index) =>
  //     item !== `${currRow},${currCol}` && array.indexOf(item) === index
  // );

  // if (typeof setX === "function") {
  //   setX(xxx);
  // }
  // console.log(typeof setX);

  if (
    currRow - setRow === setCol - currCol ||
    setRow - currRow === currCol - setCol ||
    currRow - setRow === currCol - setCol ||
    setRow - currRow === setCol - currCol ||
    currRow === setRow ||
    currCol === setCol
  ) {
    console.log("available - queen");
    return true;
  } else {
    console.log("not an available move for queen");
    return false;
  }
};

export const checkMoveAvailableKing = (
  piece,
  currRow,
  currCol,
  setRow,
  setCol
) => {
  if (piece.type !== "king") {
    return false;
  }
  if (
    // horizontaly
    (currRow - setRow === 1 && setCol === currCol) ||
    (setRow - currRow === 1 && setCol === currCol) ||
    // vertically
    (setRow === currRow && currCol - setCol === 1) ||
    (setRow === currRow && setCol - currCol === 1) ||
    // diagonal
    (setRow - currRow === 1 && currCol - setCol === 1) ||
    (currRow - setRow === 1 && setCol - currCol === 1) ||
    (currRow - setRow === 1 && currCol - setCol === 1) ||
    (setRow - currRow === 1 && setCol - currCol === 1)
  ) {
    console.log("available - king");
    return true;
  } else {
    console.log("not an available move for king");
    return false;
  }
};

export const checkMoveAvailableRook = (
  piece,
  currRow,
  currCol,
  setRow,
  setCol
) => {
  if (piece.type !== "rook") {
    return false;
  }
  if (currRow === setRow || currCol === setCol) {
    console.log("available - rook");
    return true;
  } else {
    console.log("not an available move for rook");
    return false;
  }
};
