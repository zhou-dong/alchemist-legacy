import { createTable, createStyleTable } from "./table";

import createComparedTable from "./algorithm";
import { arrayShuffle } from "utils/generic-helper";

import mock from "./__mock__/knapsack-mock.json";

import type { Item } from "./constants";

const equation = `
<pre><code>if (itemWeight > currentWeight) {
  table[row][col] = table[row - 1][col];
} else {
  table[row][col] = Math.max(
    table[row - 1][col],
    itemValue + table[row - 1][currentWeight - itemWeight]
  );
}
</code></pre>
`;

const introduction = `Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack.`;

const modalBody = `
<b>Introduction: </b>
</br>
${introduction}
</br>
<b>Equation: </b>
</br>
${equation}`;

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
    modalBody: modalBody,
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
