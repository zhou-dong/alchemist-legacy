export default (s1, s2) => {
  const rowLen = s1.length + 1;
  const colLen = s2.length + 1;

  const table = [];

  table.push(Array(colLen).fill(true));
  for (let i = 1; i < rowLen; i += 1) {
    table.push(Array(colLen).fill(false));
  }

  for (let row = 1; row < rowLen; row += 1) {
    const ch1 = s1.charAt(row - 1);
    for (let col = 1; col < colLen; col += 1) {
      const ch2 = s2.charAt(col - 1);
      if (ch1 === ch2 && table[row - 1][col - 1]) {
        table[row][col] = true;
      } else {
        table[row][col] = table[row][col - 1];
      }
    }
  }

  return table;
};
