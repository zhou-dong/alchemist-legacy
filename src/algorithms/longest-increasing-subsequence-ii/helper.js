import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE,
  TABLE_ELEMENT_DEFAULT_STYLE,
  TABLE_ELEMENT_HELPER_STYLE_TWO,
  TABLE_ELEMENT_HELPER_STYLE_THREE
} from "presentational/constants";

import mock from "./__mock__/longest-increasing-subsequence-ii-mock.json";
import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";

const createButtons = table => {
  const btns = [];
  table.forEach(row => {
    row.forEach(element => {
      if (!btns.includes(element)) {
        btns.push(element);
      }
    });
  });
  return btns;
};

const createDisplayTable = sequence => {
  const table = [];
  table.push(Array.from(sequence));
  table.push(Array(sequence.length).fill(1));
  return table;
};

const addIndicates = table => {
  table[0][0] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  table[0][1] = TABLE_ELEMENT_HELPER_STYLE_TWO;
};

const initTable = sequence => {
  const styles = [TABLE_ELEMENT_DISABLE_STYLE, TABLE_ELEMENT_DEFAULT_STYLE];
  return styles.map(style => {
    return Array(sequence.length).fill(style);
  });
};

const createStyleTable = sequence => {
  const table = initTable(sequence);
  table[1][0] = TABLE_ELEMENT_HELPER_STYLE_THREE;
  table[1][1] = TABLE_ELEMENT_HELPER_STYLE_THREE;
  addIndicates(table);
  return table;
};

const makeSequence = (size, max) =>
  Array(size)
    .fill(max)
    .map(num => Math.floor(Math.random() * num));

export default () => {
  const size = mock.size;
  const max = mock.max;
  const sequence = makeSequence(size, max);
  const compared = createComparedTable(sequence);
  return {
    table: createDisplayTable(sequence),
    styles: createStyleTable(sequence),
    compared: compared.compared,
    maxTable: compared.maxTable,
    score: sequence.length,
    buttons: createButtons(compared.compared),
    title: "Longest Increasing Subsequence II",
    modalTitle: "Longest Increasing Subsequence II",
    modalBody: modalBody,
    row: 1,
    col: 1,
    steps: 0,
    errors: 0,
    showModal: false
  };
};
