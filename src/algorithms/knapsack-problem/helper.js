// @flow

const createButtons = (vals: Array<number>): Array<number> => {
  const sum = vals.reduce((a, b) => a + b, 0);
  return Array.from(Array(sum + 1).keys());
};

const vals = [1, 4, 5, 7];

export default () => ({
  title: "Knapsack Problem",
  modalTitle: "Knapsack Problem",
  modalBody: "Knapsack Problem body",
  buttons: createButtons(vals)
});
