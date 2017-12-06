const initTable = sequence => {
  const table = [];
  const length = sequence.length;
  for (let row = 0; row < length; row += 1) {
    table.push(Array(length).fill(1));
  }
  return table;
};

const createMaxTable = (sequence, table) => {
  const maxTable = initTable(sequence);
  let max = 1;
  for (let row = 0; row < table.length; row += 1) {
    for (let col = 0; col < table[row].length; col += 1) {
      max = Math.max(max, table[row][col]);
      maxTable[row][col] = max;
    }
  }
  return maxTable;
};

const createComparedTable = sequence => {
  const table = initTable(sequence);
  for (let row = 1; row < table.length; row += 1) {
    for (let col = 1; col < row + 1; col += 1) {
      if (sequence[row] > sequence[col - 1]) {
        table[row][col] = Math.max(
          table[row][col - 1],
          table[col - 1][col - 1] + 1
        );
      } else {
        table[row][col] = table[row][col - 1];
      }
    }
  }
  return table;
};

export default sequence => {
  const compared = createComparedTable(sequence);
  return {
    compared: compared,
    maxTable: createMaxTable(sequence, compared)
  };
};
