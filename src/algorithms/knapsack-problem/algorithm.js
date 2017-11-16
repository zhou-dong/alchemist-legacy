// @flow

import type { Item } from "./constants";

export default (
  items: Array<Item>,
  totalWeight: number
): Array<Array<number>> => {
  const table: Array<Array<number>> = [];

  const rowLength = items.length + 2;
  const colLength = totalWeight + 1;

  const initTable = () => {
    table.push(Array.from(Array(colLength).keys()));
    for (let row = 1; row < rowLength; row += 1) {
      table.push(Array(colLength).fill(0));
    }
  };

  const execute = () => {
    for (let row = 2; row < rowLength; row += 1) {
      const currentItem = items[row - 2];
      const itemWeight = currentItem.weight;
      const itemValue = currentItem.value;
      for (let col = 1; col < colLength; col += 1) {
        const currentWeight = table[0][col];
        if (itemWeight > currentWeight) {
          table[row][col] = table[row - 1][col];
        } else {
          table[row][col] = Math.max(
            table[row - 1][col],
            itemValue + table[row - 1][currentWeight - itemWeight]
          );
        }
      }
    }
  };

  initTable();
  execute();

  return table;
};
