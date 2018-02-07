const initTable = (totalLength, prices) => {
  const table = [];
  for (let i = 0; i < prices.length + 1; i += 1) {
    table.push(Array(totalLength + 1).fill(0));
  }
  return table;
};

export default (totalLength, prices) => {
  const table = initTable(totalLength, prices);
  for (let row = 1; row < table.length; row += 1) {
    const len = prices[row - 1].length;
    const price = prices[row - 1].price;
    for (let col = 1; col < table[row].length; col += 1) {
      if (col < len) {
        table[row][col] = table[row - 1][col];
      } else {
        table[row][col] = Math.max(
          table[row - 1][col],
          price + table[row][col - len]
        );
      }
    }
  }
  return table;
};
