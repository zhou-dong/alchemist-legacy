import { clone2DArray } from "utils/generic-helper";

export default data => {
  const table = clone2DArray(data);
  if (table.length === 0) {
    return table;
  }

  const updateFirstRow = () => {
    table[0] = table[0].reduce((result, current, index) => {
      result[index] = index === 0 ? table[0][0] : result[index - 1] + current;
      return result;
    }, []);
  };

  const updateFirstCol = () => {
    table.forEach((row, index) => {
      if (index !== 0) {
        row[0] = table[index - 1][0] + row[0];
      }
    });
  };

  const execute = () => {
    for (let row = 1; row < table.length; row += 1) {
      for (let col = 1; col < table[row].length; col += 1) {
        const min = Math.min(table[row - 1][col], table[row][col - 1]);
        table[row][col] = table[row][col] + min;
      }
    }
  };

  updateFirstRow();
  updateFirstCol();
  execute();

  return table;
};
