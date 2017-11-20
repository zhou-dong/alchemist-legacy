import {
  createDPTableWithoutIndicator,
  createStyleTableWithIndicator
} from "utils/dp-helper";

import mock from "./__mock__/longest-common-subsequence-mock.json";
import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";
import { stringShuffle } from "utils/generic-helper";
import {
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_DISABLE_STYLE
} from "presentational/constants";

const longerLength = (str1, str2) =>
  str1.length > str2.length ? str1.length : str2.length;

const createButtons = (str1, str2) => {
  const size = longerLength(str1, str2);
  return Array.from(Array(size + 1).keys());
};

const createDisplayTable = (str1, str2) => {
  const table = createDPTableWithoutIndicator(str2, str1);
  for (let col = 1; col < table[1].length; col += 1) {
    table[1][col] = 0;
  }
  table.forEach(row => (row[1] = 0));
  table[0][1] = "";
  return table;
};

const createStyleTable = (str1, str2) => {
  const table = createStyleTableWithIndicator(str2, str1);
  table.forEach((row, index) => (row[1] = TABLE_ELEMENT_SUCCESS_STYLE));
  table[1] = Array(table[0].length).fill(TABLE_ELEMENT_SUCCESS_STYLE);
  table[0][1] = TABLE_ELEMENT_DISABLE_STYLE;
  table[1][0] = TABLE_ELEMENT_DISABLE_STYLE;
  return table;
};

const getTotalScore = (str1, str2) => longerLength(str1, str2);

export default () => {
  const str1 = stringShuffle(mock.s1);
  const str2 = stringShuffle(mock.s2);
  return {
    table: createDisplayTable(str1, str2),
    styles: createStyleTable(str1, str2),
    compared: createComparedTable(str1, str2),
    score: getTotalScore(str1, str2),
    buttons: createButtons(str1, str2),
    title: "Longest Common Subsequence",
    modalTitle: "Longest Common Subsequence",
    modalBody: modalBody,
    row: 2,
    col: 2,
    steps: 0,
    errors: 0,
    showModal: false
  };
};
