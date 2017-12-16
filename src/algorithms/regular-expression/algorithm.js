const initTable = (pattern, text) => {
  const table = [];
  for (let row = 0; row < text.length + 1; row += 1) {
    table.push(Array(pattern.length + 1).fill(false));
  }
  return table;
};

export default (pattern, text) => {
  const table = initTable(pattern, text);

  table[0][0] = true;

  for (let col = 1; col < pattern.length; col += 1) {
    if (pattern.charAt(col - 1) === "*") {
      table[0][col] = table[0][col - 2];
    }
  }

  for (let row = 1; row < table.length; row += 1) {
    const t = text.charAt(row - 1);
    for (let col = 1; col < table[row].length; col += 1) {
      const p = pattern.charAt(col - 1);
      if (p === "." || p === t) {
        table[row][col] = table[row - 1][col - 1];
      } else if (p === "*") {
        if (table[row][col - 2]) {
          table[row][col] = table[row][col - 2];
        } else if (
          pattern.charAt(col - 2) === "." ||
          pattern.charAt(col - 2) === t
        ) {
          table[row][col] = table[row - 1][col];
        }
      }
    }
  }

  return table;
};
