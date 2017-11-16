// @flow

import type { Item } from "./constants";
import {
  TABLE_ELEMENT_DEFAULT_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE
} from "presentational/constants";

export const createTable = (
  items: Array<Item>,
  totalWeight: number
): Array<Array<string | number>> => {
  const table: Array<Array<string | number>> = [];
  table.push(
    ["VALUE", "WEIGHT"].concat(Array.from(Array(totalWeight + 1).keys()))
  );
  table.push(Array(3 + totalWeight).fill(0));
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
  const rowLength = items.length + 2;
  const colLength = 3 + totalWeight;
  for (let i = 0; i < rowLength; i += 1) {
    table.push(Array(colLength).fill(TABLE_ELEMENT_DEFAULT_STYLE));
  }

  const updateFirstRow = () => {
    for (let col = 0; col < table[0].length; col += 1) {
      table[0][col] = TABLE_ELEMENT_DISABLE_STYLE;
      table[1][col] = TABLE_ELEMENT_SUCCESS_STYLE;
    }
  };

  const updateFirst2Cols = () => {
    table.forEach(row => {
      row[0] = TABLE_ELEMENT_DISABLE_STYLE;
      row[1] = TABLE_ELEMENT_DISABLE_STYLE;
      row[2] = TABLE_ELEMENT_SUCCESS_STYLE;
    });
  };

  updateFirstRow();
  updateFirst2Cols();

  table[0][2] = TABLE_ELEMENT_DISABLE_STYLE;
  table[2][3] = TABLE_ELEMENT_ON_GOING_STYLE;
  table[0][3] = TABLE_ELEMENT_INDICATE_STYLE;
  table[2][0] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  table[2][1] = TABLE_ELEMENT_INDICATE_STYLE;
  return table;
};
