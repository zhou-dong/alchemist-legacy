import { createTable, createStyleTable } from "./table";

import createComparedTable from "./algorithm";
import { arrayShuffle } from "utils/generic-helper";

import mock from "./__mock__/knapsack-mock.json";

import type { Item } from "./constants";

export default () => {
  const items: Array<number> = arrayShuffle(mock.items);
  const totalWeight: number = mock.totalWeight;

  const createButtons = (items: Array<Item>): Array<number> => {
    const sum = items.reduce((total, item) => total + item.value, 0);
    return Array.from(Array(sum + 1).keys());
  };

  return {
    title: "Knapsack Problem",
    modalTitle: "Knapsack Problem",
    modalBody: "Knapsack Problem body",
    steps: 0,
    errors: 0,
    row: 2,
    col: 3,
    totalWeight: totalWeight,
    score: totalWeight,
    table: createTable(items, totalWeight),
    styles: createStyleTable(items, totalWeight),
    compared: createComparedTable(items, totalWeight),
    buttons: createButtons(items),
    items: items
  };
};
