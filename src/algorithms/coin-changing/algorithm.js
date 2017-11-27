export default (total, coins) => {
  const cols = total + 1;
  const table = [];
  table.push(Array(cols).fill(Infinity));
  coins.forEach(() => table.push(Array(cols).fill(0)));
  for (let row = 1; row < table.length; row += 1) {
    const coin = coins[row - 1];
    for (let col = 1; col < table[row].length; col += 1) {
      if (coin > col) {
        table[row][col] = table[row - 1][col];
      } else {
        table[row][col] = Math.min(
          table[row][col - coin] + 1,
          table[row - 1][col]
        );
      }
    }
  }
  return table;
};
