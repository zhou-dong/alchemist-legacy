import {
  createDPTableWithIndicator,
  createStyleTableWithIndicator
} from "utils/dp-helper";

import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_HELPER_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_ERROR_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE
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
const createButtons = () => {};

const createDisplayTable = grid => createTable(grid, "");
const createStyleTable = grid => createTable(grid, "");

const getTotalScore = grid => {
  if (!grid || grid.length === 0) {
    return 0;
  }
  return grid.length === 1 ? grid.length : grid.length * grid[0].length;
};

const getStartRowIndex = () => {};

const getStartColIndex = () => {};

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
    compared: createComparedTable(),
    score: getTotalScore(data),
    buttons: createButtons(),
    title: "Minimum Path Sum",
    modalTitle: "Minimum Path Sum",
    modalBody: modalBody,
    row: getStartRowIndex(),
    col: getStartColIndex(),
    displayTable: data,
    displayTableStyles: getDisplayTableStyles(data),
    steps: 0,
    errors: 0,
    showModal: false
  };
};
