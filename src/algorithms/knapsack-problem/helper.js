import { createTable, createStyleTable } from "./table";

import createComparedTable from "./algorithm";
import { arrayShuffle } from "utils/generic-helper";

import mock from "./__mock__/knapsack-mock.json";

const equation = `
<pre><code>if (itemWeight > currentWeight) {
  table[row][col] = table[row - 1][col];
} else {
  table[row][col] = Math.max(
    table[row - 1][col],
    table[row - 1][currentWeight - itemWeight] + itemValue
  );
}</code></pre>
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

const createButtons = compared => {
  const result = [];
  for (let row = 2; row < compared.length; row += 1) {
    for (let col = 1; col < compared[row].length; col += 1) {
      const element = compared[row][col];
      if (!result.includes(element)) {
        result.push(element);
      }
    }
  }
  return result.sort((a, b) => a - b);
};

export default state => {
  const items: Array<number> = arrayShuffle(mock.items);
  const totalWeight: number = mock.totalWeight;
  const compared = createComparedTable(items, totalWeight);
  const count = (state && state.count) || 0;
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
    compared: compared,
    buttons: createButtons(compared),
    items: items,
    id: 6,
    count: count,
    success: false
  };
};
