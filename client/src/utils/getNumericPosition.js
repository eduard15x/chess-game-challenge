export const getNumericPosition = (col, row, colsArr, rowsArr) => {
  const colIndex = colsArr.indexOf(col);
  const rowIndex = rowsArr.indexOf(row);
  return rowIndex * 8 + colIndex + 1;
};
