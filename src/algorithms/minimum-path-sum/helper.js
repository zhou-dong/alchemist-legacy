import {
  TABLE_ELEMENT_HELPER_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE
} from "presentational/constants";
import { arrayShuffle, clone2DArray } from "utils/generic-helper";

import mock from "./__mock__/minimum-path-sum-mock.json";
import createComparedTable from "./algorithm";

const equation = `
<pre><code>const min = Math.min(table[row - 1][col], table[row][col - 1])
table[row][col] = table[row][col] + min
</code></pre>
`;

const introduction = `Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.<br>
<b>Note</b>: You can only move either down or right at any point in time.`;

const modalBody = `
<b>Introduction: </b>
</br>
${introduction}
</br>
<b>Equation: </b>
</br>
${equation}`;

const getShuffledData = () => {
  const shuffled = arrayShuffle(mock);
  shuffled.forEach(array => arrayShuffle(array));
  return shuffled;
};

const createTable = (grid, toFilled) => {
  if (!grid) {
    return [];
  }
  const table = [];
  for (let row = 0; row < grid.length; row += 1) {
    table.push(Array(grid[row].length).fill(toFilled));
  }
  return table;
};

const createButtons = compared => {
  const result = [];
  compared.forEach(row =>
    row.forEach(element => {
      if (!result.includes(element)) {
        result.push(element);
      }
    })
  );
  return result.sort((a, b) => a - b);
};

const createDisplayTable = grid => clone2DArray(grid);

const createStyleTable = grid => {
  const result = createTable(grid, "");
  result[0][0] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  result[0][1] = TABLE_ELEMENT_ON_GOING_STYLE;
  return result;
};

const getTotalScore = grid => {
  if (!grid || grid.length === 0) {
    return 0;
  }
  return grid.length === 1 ? grid.length : grid.length * grid[0].length;
};

const getDisplayTableStyles = table => {
  if (!table) {
    return [];
  }
  const styles = [];
  for (let row = 0; row < table.length; row += 1) {
    styles.push(Array(table[row].length).fill(TABLE_ELEMENT_HELPER_STYLE));
  }
  styles[0][0] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[0][1] = TABLE_ELEMENT_ON_GOING_STYLE;
  return styles;
};

export default () => {
  const data = getShuffledData();
  const compared = createComparedTable(data);
  return {
    table: createDisplayTable(data),
    styles: createStyleTable(data),
    compared: compared,
    score: getTotalScore(data),
    buttons: createButtons(compared),
    title: "Minimum Path Sum",
    modalTitle: "Minimum Path Sum",
    modalBody: modalBody,
    row: 0,
    col: 1,
    displayTable: data,
    displayTableStyles: getDisplayTableStyles(data),
    steps: 0,
    errors: 0,
    showModal: false
  };
};
