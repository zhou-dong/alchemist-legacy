// @flow

import { createTable, createStyleTable } from "./table";

import createComparedTable from "./algorithm";

const createButtons = (vals: Array<number>): Array<number> => {
  const sum = vals.reduce((a, b) => a + b, 0);
  return Array.from(Array(sum + 1).keys());
};

class Item {
  weight: number;
  value: number;
  constructor(weight: number, value: number) {
    this.weight = weight;
    this.value = value;
  }
}

const totalWeight = 7;
const vals = [1, 4, 5, 7];
const items = [];
items.push(new Item(3, 4));
items.push(new Item(5, 7));
items.push(new Item(1, 1));
items.push(new Item(4, 5));

// items.sort((a,b) => a.weight - b.weight);
// console.log(items);

export default () => ({
  title: "Knapsack Problem",
  modalTitle: "Knapsack Problem",
  modalBody: "Knapsack Problem body",
  score: totalWeight,
  steps: 0,
  errors: 0,
  buttons: createButtons(vals),
  table: createTable(items, totalWeight),
  styles: createStyleTable(items, totalWeight),
  compared: createComparedTable(items, totalWeight)
});
