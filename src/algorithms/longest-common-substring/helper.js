import {
  createDPTableWithoutIndicator,
  createStyleTableWithIndicator
} from "utils/dp-helper";

import mock from "./__mock__/longest-common-substring-mock.json";
import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";
import { longestString, stringShuffle } from "utils/generic-helper";
import {
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_DISABLE_STYLE
} from "presentational/constants";

const createButtons = (str1, str2) => {
  const length = longestString(str1, str2).length + 1;
  return Array.from(Array(length).keys());
};

const createDisplayTable = (str1, str2) => {
  const colLen = str2.length + 2;
  const table = createDPTableWithoutIndicator(str2, str1);
  table[1] = Array(colLen).fill(0);
  table.forEach(row => (row[1] = 0));
  table[1][0] = "";
  table[0][1] = "";
  return table;
};

const createStyleTable = (str1, str2) => {
  const colLen = str2.length + 2;
  const table = createStyleTableWithIndicator(str2, str1);
  table[1] = Array(colLen).fill(TABLE_ELEMENT_SUCCESS_STYLE);
  table.forEach(row => (row[1] = TABLE_ELEMENT_SUCCESS_STYLE));
  table[0][1] = TABLE_ELEMENT_DISABLE_STYLE;
  table[1][0] = TABLE_ELEMENT_DISABLE_STYLE;
  return table;
};

const getTotalScore = (str1, str2) => longestString(str1, str2).length;

export default state => {
  const str1 = stringShuffle(mock.s1);
  const str2 = stringShuffle(mock.s2);
  const count = (state && state.count) || 0;
  return {
    table: createDisplayTable(str1, str2),
    styles: createStyleTable(str1, str2),
    compared: createComparedTable(str1, str2),
    score: getTotalScore(str1, str2),
    buttons: createButtons(str1, str2),
    title: "Longest Common Substring",
    modalTitle: "Longest Common Substring",
    modalBody: modalBody,
    row: 2,
    col: 2,
    steps: 0,
    errors: 0,
    showModal: false,
    id: 4,
    success: false,
    count: count
  };
};
