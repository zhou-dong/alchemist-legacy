const initTable = length => {
  const table = [];
  for (let i = 0; i < length; i += 1) {
    table.push(Array(length).fill(false));
  }
  return table;
};

export default function(str, dict) {
  const table = initTable(str.length);
  for (let len = 1; len <= str.length; len += 1) {
    for (
      let start = 0, end = start + len - 1;
      end <= str.length - 1;
      start += 1, end += 1
    ) {
      const sub = str.substring(start, end + 1);
      if (dict.includes(sub)) {
        table[start][end] = true;
        continue;
      }
      for (let i = start; i < end; i += 1) {
        if (table[start][i] && table[i + 1][end]) {
          table[start][end] = true;
          break;
        }
      }
    }
  }
  return table;
}
