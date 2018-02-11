const max = Number.MAX_SAFE_INTEGER;

const initTable = array => {
  const table = [];
  for (let i = 0; i < array.length; i += 1) {
    table.push(Array(array.length).fill(max));
  }
  table[0][0] = 0;
  return table;
};

export default array => {
  const table = initTable(array);
  for (let i = 0; i < table.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      const prev = j === 0 ? max : table[j - 1][i];
      let last = (j === 0 ? 0 : table[j - 1][j]) + 1;
      if (j + array[j] < i) last = max;
      table[j][i] = Math.min(last, prev);
    }
  }
  return table;
};
