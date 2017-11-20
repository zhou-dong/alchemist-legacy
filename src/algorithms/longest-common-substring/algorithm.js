const initTable = (str1, str2) => {
  const table = [];
  const rowLen = str1.length + 1;
  const colLen = str2.length + 1;
  for (let row = 0; row < rowLen; row += 1) {
    table.push(Array(colLen).fill(0));
  }
  return table;
};

export const resultPoint = table => {
  let rowIndex = 0;
  let colIndex = 0;
  let max = 0;
  for (let row = 0; row < table.length; row += 1) {
    for (let col = 0; col < table[row].length; col += 1) {
      if (table[row][col] >= max) {
        max = table[row][col];
        rowIndex = row;
        colIndex = col;
      }
    }
  }
  return {
    max: max,
    row: rowIndex,
    col: colIndex
  };
};

export default (str1, str2) => {
  const table = initTable(str1, str2);
  for (let row = 1; row < table.length; row += 1) {
    const a = str1.charAt(row - 1);
    for (let col = 1; col < table[row].length; col += 1) {
      const b = str2.charAt(col - 1);
      if (a === b) {
        table[row][col] = table[row - 1][col - 1] + 1;
      } else {
        table[row][col] = 0;
      }
    }
  }
  return table;
};
