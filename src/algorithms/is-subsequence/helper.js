import {
  createDPTableWithoutIndicator,
  createStyleTableWithoutIndicator
} from "utils/dp-helper";

import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE
} from "presentational/constants";

import mock from "./__mock__/is-subsequence-mock.json";
import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";
import { stringShuffle } from "utils/generic-helper";

const createDisplayTable = (s1, s2) => {
  const table = createDPTableWithoutIndicator(s2, s1);
  if (!table) {
    return table;
  }
  for (let col = 1; col < table[1].length; col += 1) {
    table[1][col] = "T";
  }
  for (let row = 2; row < table.length; row += 1) {
    table[row][1] = "F";
  }
  return table;
};

const createStyleTable = (s1, s2) => {
  const table = createStyleTableWithoutIndicator(s2, s1);
  if (!table) {
    return table;
  }
  table[1] = Array(table[1].length).fill(TABLE_ELEMENT_SUCCESS_STYLE);
  table.forEach(row => {
    row[1] = TABLE_ELEMENT_SUCCESS_STYLE;
  });
  table[0] = Array(table[0].length).fill(TABLE_ELEMENT_DISABLE_STYLE);
  table.forEach(row => {
    row[0] = TABLE_ELEMENT_DISABLE_STYLE;
  });
  table[2][2] = TABLE_ELEMENT_ON_GOING_STYLE;
  table[0][2] = TABLE_ELEMENT_INDICATE_STYLE;
  table[2][0] = TABLE_ELEMENT_INDICATE_STYLE;
  return table;
};

const getTotalScore = (s1, s2) =>
  s1.length > s2.length ? s1.length : s2.length;

export default () => {
  const s1 = stringShuffle(mock.s1);
  const s2 = stringShuffle(mock.s2);
  return {
    table: createDisplayTable(s1, s2),
    styles: createStyleTable(s1, s2),
    compared: createComparedTable(s1, s2),
    score: getTotalScore(s1, s2),
    buttons: ["TRUE", "FALSE"],
    title: "Is Subsequence",
    modalTitle: "Is Subsequence",
    modalBody: modalBody,
    row: 2,
    col: 2,
    steps: 0,
    errors: 0,
    showModal: false
  };
};
