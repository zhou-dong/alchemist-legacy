import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_DEFAULT_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE
} from "presentational/constants";

import mock from "./__mock__/minimum-number-of-jumps-to-reach-end-mock.json";
import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";

const createButtons = compared => {
  const array = [];
  for (let row = 1; row < compared.length; row += 1) {
    for (let col = 1; col < compared[row].length; col += 1) {
      const ele = compared[row][col];
      if (!array.includes(ele)) array.push(ele);
    }
  }
  return array.sort((a, b) => a - b);
};

const createDisplayTable = array => {
  const table = [];
  table.push(["INDEX"].concat(Array.from(Array(array.length).keys())));
  table.push(["JUMPS"].concat(array));
  table.push(["RESULT", 0].concat(Array(array.length - 1).fill("-")));
  return table;
};

const createStyleTable = array => {
  const length = array.length;
  const table = [];
  for (let i = 0; i < 2; i += 1) {
    table.push(Array(length + 1).fill(TABLE_ELEMENT_DISABLE_STYLE));
  }
  table.push(
    [TABLE_ELEMENT_DISABLE_STYLE, TABLE_ELEMENT_SUCCESS_STYLE].concat(
      Array(length - 1).fill(TABLE_ELEMENT_DEFAULT_STYLE)
    )
  );
  table[2][2] = TABLE_ELEMENT_ON_GOING_STYLE;
  for (let i = 1; i < array.length && i <= array[0]; i += 1) {
    table[1][i + 1] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  }
  table[0][1] = TABLE_ELEMENT_INDICATE_STYLE;
  table[0][2] = TABLE_ELEMENT_INDICATE_STYLE;
  return table;
};

const rewriteCompared = table => {
  const max = Number.MAX_SAFE_INTEGER;
  for (let row = 0; row < table.length; row += 1) {
    for (let col = 0; col < table[row].length; col += 1) {
      if (table[row][col] === max) {
        table[row][col] = "x";
      } else {
        table[row][col] = table[row][col] + "";
      }
    }
  }
};

export default state => {
  const length = mock.length;
  const max = mock.max;

  const random = max => Math.floor(Math.random() * max);
  const array = Array(length)
    .fill(max)
    .map(random);

  // const array = [2, 3, 1, 1, 2, 4, 2, 0, 1, 1];
  const compared = createComparedTable(array);
  const count = (state && state.count) || 0;
  rewriteCompared(compared);
  return {
    table: createDisplayTable(array),
    styles: createStyleTable(array),
    compared: compared,
    score: array.length,
    buttons: createButtons(compared),
    title: "Minimum Number Of Jumps To Reach End",
    modalTitle: "Minimum Number Of Jumps To Reach End",
    modalBody: modalBody,
    row: 2,
    col: 2,
    steps: 0,
    errors: 0,
    showModal: false,
    count: count,
    id: 21,
    success: false
  };
};
