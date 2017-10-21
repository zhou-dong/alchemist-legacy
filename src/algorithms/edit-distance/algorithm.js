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

export const createStyleTable = (
  str1: string,
  str2: string,
  defaultStyle: string,
  goingStyle: string,
  DISABLE_TABLE_BUTTON: string
): Array<Array<string>> => {
  const rowLength = str1.length + 2;
  const colLength = str2.length + 2;
  const table: Array<Array<string>> = [];
  for (let row = 0; row < rowLength; row += 1) {
    table.push(Array(colLength).fill(defaultStyle));
  }
  if (table.length > 0) {
    for (let col = 0; col < table[0].length; col += 1) {
      table[0][col] = DISABLE_TABLE_BUTTON;
    }
  }
  for (let row = 0; row < table.length; row += 1) {
    table[row][0] = DISABLE_TABLE_BUTTON;
  }
  if (rowLength > 0 && colLength > 0) {
    table[1][1] = goingStyle;
  }
  return table;
};
