const initTable = (eggs, floors) => {
  const table = [];
  table.push(Array.from(Array(floors + 1).keys()));
  for (let row = 1; row < eggs; row += 1) {
    table.push(Array(floors + 1).fill(0));
  }
  return table;
};

export default (eggs, floors) => {
  const table = initTable(eggs, floors);
  for (let row = 1; row < table.length; row += 1) {
    for (let col = 1; col < table[row].length; col += 1) {
      if (row + 1 > col) {
        table[row][col] = table[row - 1][col];
      } else {
        let min = floors;
        for (let f = 1; f <= col; f += 1) {
          const max = Math.max(table[row - 1][f - 1], table[row][col - f]);
          min = Math.min(min, max);
        }
        table[row][col] = 1 + min;
      }
    }
  }
  console.log(table);
  return table;
};
