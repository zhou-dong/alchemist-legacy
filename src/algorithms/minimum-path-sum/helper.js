import {
  createDPTableWithIndicator,
  createStyleTableWithIndicator
} from "utils/dp-helper";

import {
  TABLE_ELEMENT_HELPER_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE
} from "presentational/constants";
import { arrayShuffle } from "utils/generic-helper";

import mock from "./__mock__/minimum-path-sum-mock.json";
import createComparedTable from "./algorithm";

const equation = `
<pre><code>
  ... code ...
</code></pre>
`;

const introduction = "... introduction ...";
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

const createButtons = data => {
  let min = Number.MAX_SAFE_INTEGER;
  let sum = 0;
  data.forEach(row => {
    row.forEach(element => {
      min = Math.min(min, element);
      sum += element;
    });
  });
  const result = [];
  for (let i = min; i <= sum; i += 1) {
    result.push(i);
  }
  return result;
};

const createDisplayTable = grid => createTable(grid, "");

const createStyleTable = grid => {
  const result = createTable(grid, "");
  result[0][0] = TABLE_ELEMENT_ON_GOING_STYLE;
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
  return styles;
};

export default () => {
  const data = getShuffledData();
  return {
    table: createDisplayTable(data),
    styles: createStyleTable(data),
    compared: createComparedTable(data),
    score: getTotalScore(data),
    buttons: createButtons(data),
    title: "Minimum Path Sum",
    modalTitle: "Minimum Path Sum",
    modalBody: modalBody,
    row: 0,
    col: 0,
    displayTable: data,
    displayTableStyles: getDisplayTableStyles(data),
    steps: 0,
    errors: 0,
    showModal: false
  };
};
