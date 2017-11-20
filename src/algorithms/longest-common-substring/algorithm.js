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
  let max = 0;
  table.forEach(row => {
    max = Math.max(max, row.reduce((a, b) => Math.max(a, b)));
  });
  const result = [];
  table.forEach((row, rowIndex) => {
    row.forEach((element, colIndex) => {
      if (element === max) {
        result.push({ row: rowIndex, col: colIndex });
      }
    });
  });
  return result;
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
