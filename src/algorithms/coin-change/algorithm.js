const initTable = (total, coins) => {
  const table = [];
  table.push(Array(total + 1).fill(0));
  coins.forEach(() => {
    table.push([1].concat(Array(total).fill(0)));
  });
  return table;
};

export default (total, coins) => {
  const table = initTable(total, coins);
  for (let row = 1; row < table.length; row += 1) {
    const coin = coins[row - 1];
    for (let col = 1; col < table[row].length; col += 1) {
      if (coin > col) {
        table[row][col] = table[row - 1][col];
      } else {
        table[row][col] = table[row][col - coin] + table[row - 1][col];
      }
    }
  }
  return table;
};
