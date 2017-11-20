const initTable = (rowLen, colLen) => {
  const table = [];
  for (let row = 0; row < rowLen; row += 1) {
    table.push(Array(colLen).fill(0));
  }
  return table;
};

export default (str1, str2) => {
  const rowLen = str1.length + 1;
  const colLen = str2.length + 1;
  const table = initTable(rowLen, colLen);
  for (let row = 1; row < rowLen; row += 1) {
    const a = str1.charAt(row - 1);
    for (let col = 1; col < colLen; col += 1) {
      const b = str2.charAt(col - 1);
      if (a === b) {
        table[row][col] = table[row - 1][col - 1] + 1;
      } else {
        table[row][col] = Math.max(table[row][col - 1], table[row - 1][col]);
      }
    }
  }
  return table;
};
