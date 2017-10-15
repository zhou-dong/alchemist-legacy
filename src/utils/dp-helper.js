// @flow

export function createDPTable(
  str1: string,
  str2: string
): Array<Array<string | number>> {
  const createFirstRow = (): Array<string | number> => {
    return ["", ""].concat(str1.split(""));
  };

  const createEmptyRow = (size: number): Array<string | number> => {
    return Array(size).fill("");
  };

  const insertFirstCol = (table: Array<Array<string | number>>): void => {
    str2.split("").forEach((ch, i) => (table[i + 2][0] = ch));
  };

  const createTable = (): Array<Array<string | number>> => {
    const table: Array<Array<string | number>> = [];
    table.push(createFirstRow());
    for (let i = 0; i <= str2.length; i += 1) {
      table.push(createEmptyRow(str1.length + 2));
    }
    insertFirstCol(table);
    return table;
  };

  return createTable();
}
