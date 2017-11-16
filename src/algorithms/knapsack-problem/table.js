// @flow

import type { Item } from "./constants";

export const createTable = (
  items: Array<Item>,
  totalWeight: number
): Array<Array<string | number>> => {
  const table: Array<Array<string | number>> = [];
  table.push(
    ["VALUE", "WEIGHT"].concat(Array.from(Array(totalWeight + 1).keys()))
  );
  items.forEach(item =>
    table.push([item.value, item.weight, 0].concat(Array(totalWeight).fill("")))
  );
  return table;
};

export const createStyleTable = (
  items: Array<Item>,
  totalWeight: number
): Array<Array<string>> => {
  const table: Array<Array<string>> = [];
  const rowLength = items.length + 1;
  const colLength = 3 + totalWeight;
  for (let i = 0; i < rowLength; i += 1) {
    table.push(Array(colLength).fill(""));
  }
  return table;
};
