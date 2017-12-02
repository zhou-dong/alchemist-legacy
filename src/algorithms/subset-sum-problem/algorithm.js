const initTable = (totals, array) => {
  const table = [];
  for (let row = 0; row < array.length + 1; row += 1) {
    table.push([true].concat(Array(totals.length).fill(false)));
  }
  return table;
};

export default (totals, array) => {
  const table = initTable(totals, array);
  for (let row = 1; row < table.length; row += 1) {
    const element = array[row - 1];
    for (let col = 1; col < table[row].length; col += 1) {
      const current = totals[col - 1];
      if (element > current) {
        table[row][col] = table[row - 1][col];
      } else {
        table[row][col] =
          table[row - 1][col] || table[row - 1][current - element];
      }
    }
  }
  return table;
};
