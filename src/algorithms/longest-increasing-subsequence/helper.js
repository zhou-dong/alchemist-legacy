import mock from "./__mock__/longest-increasing-subsequence-mock.json";
import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";

import {
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE,
  TABLE_ELEMENT_HELPER_STYLE,
  TABLE_ELEMENT_HELPER_STYLE_TWO,
  TABLE_ELEMENT_HELPER_STYLE_THREE,
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_DEFAULT_STYLE
} from "presentational/constants";

const createButtons = size => {
  const result = Array.from(Array(size + 1).keys());
  result.shift();
  return result;
};

const createTable = sequence => {
  const table = [];
  sequence.forEach((element, index) => {
    table.push([index, element].concat(Array(sequence.length).fill("")));
  });
  for (let row = 0; row < table.length; row += 1) {
    for (let col = 2; col < row + 3; col += 1) {
      table[row][col] = 1;
    }
  }
  table[0][sequence.length + 1] = 1;
  return table;
};

const addIndicate = styles => {
  styles[0][0] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  styles[0][1] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  styles[1][0] = TABLE_ELEMENT_HELPER_STYLE_TWO;
  styles[1][1] = TABLE_ELEMENT_HELPER_STYLE_TWO;
};

const createStyles = (sequence, helpers) => {
  const table = [];
  for (let row = 0; row < sequence.length; row += 1) {
    table.push(
      [
        TABLE_ELEMENT_HELPER_STYLE,
        TABLE_ELEMENT_DISABLE_STYLE,
        TABLE_ELEMENT_SUCCESS_STYLE
      ].concat(Array(sequence.length - 1).fill(TABLE_ELEMENT_DEFAULT_STYLE))
    );
  }

  table[0][table[0].length - 1] = TABLE_ELEMENT_HELPER_STYLE_TWO;
  table[1][3] = TABLE_ELEMENT_ON_GOING_STYLE;

  addIndicate(table);
  helpers.forEach(pos => {
    table[pos[0]][pos[1]] = TABLE_ELEMENT_HELPER_STYLE_THREE;
  });
  return table;
};

const makeSequence = (size, max) =>
  Array(size)
    .fill(max)
    .map(num => Math.floor(Math.random() * num));

export default state => {
  const size = mock.size;
  const max = mock.max;
  const sequence = makeSequence(size, max);
  const compared = createComparedTable(sequence);
  const helpers = sequence[1] > sequence[0] ? [[0, 2]] : [[1, 2]];
  const count = (state && state.count) || 0;
  return {
    table: createTable(sequence),
    styles: createStyles(sequence, helpers),
    compared: compared.compared,
    maxTable: compared.maxTable,
    score: size,
    buttons: createButtons(size),
    title: "Longest Increasing Subsequence",
    modalTitle: "Longest Increasing Subsequence",
    modalBody: modalBody,
    row: 1,
    col: 3,
    steps: 0,
    errors: 0,
    showModal: false,
    helpers: helpers,
    id: 15,
    success: false,
    count: count
  };
};
