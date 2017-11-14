// @flow

export const createDpTable = (
  str1: string,
  str2: string
): Array<Array<number>> => {
  const rowLength = str1.length + 1;
  const colLength = str2.length + 1;
  const table: Array<Array<number>> = [];

  const range = (size: number): Array<number> => {
    return Array.from(Array(size).keys());
  };

  const createFirstRow = (): void => {
    table.push(range(rowLength));
  };

  const appendRows = (): void => {
    range(colLength - 1).forEach(() => {
      table.push(Array(rowLength).fill(0));
    });
  };

  const updateFirstCol = (): void => {
    range(colLength).map(i => (table[i][0] = i));
  };

  const runDP = (): void => {
    for (let row = 1; row <= str2.length; row += 1) {
      for (let col = 1; col <= str1.length; col += 1) {
        if (str2.charAt(row - 1) === str1.charAt(col - 1)) {
          table[row][col] = table[row - 1][col - 1];
        } else {
          const min: number = Math.min(
            table[row - 1][col - 1],
            table[row - 1][col],
            table[row][col - 1]
          );
          table[row][col] = min + 1;
        }
      }
    }
  };

  const createTable = (): Array<Array<number>> => {
    createFirstRow();
    appendRows();
    updateFirstCol();
    runDP();
    return table;
  };

  return createTable();
};
