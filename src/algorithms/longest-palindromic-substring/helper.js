import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE,
  TABLE_ELEMENT_DEFAULT_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_HELPER_STYLE,
  TABLE_ELEMENT_HELPER_STYLE_THREE
} from "presentational/constants";

import mock from "./__mock__/longest-palindromic-substring-mock.json";
import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";

const createDisplayTable = sequence => {
  const table = [];
  const length = sequence.length;
  const chars = sequence.split("");
  table.push([1, ""].concat(Array.from(Array(length).keys())));
  table.push(["", ""].concat(Array.from(chars)));
  chars.forEach((ch, i) => {
    table.push([i, ch].concat(Array(length).fill("")));
  });
  return table;
};

const createStyleTable = sequence => {
  const table = [];
  const seqLen = sequence.length;
  table.push(Array(seqLen + 2).fill(TABLE_ELEMENT_HELPER_STYLE));
  table.push(Array(seqLen + 2).fill(TABLE_ELEMENT_DISABLE_STYLE));
  for (let i = 0; i < sequence.length; i += 1) {
    table.push(
      [TABLE_ELEMENT_HELPER_STYLE, TABLE_ELEMENT_DISABLE_STYLE].concat(
        Array(seqLen).fill(TABLE_ELEMENT_DEFAULT_STYLE)
      )
    );
  }
  table[0][0] = TABLE_ELEMENT_HELPER_STYLE_THREE;
  table[1][0] = TABLE_ELEMENT_HELPER_STYLE;

  table[2][2] = TABLE_ELEMENT_ON_GOING_STYLE;
  table[0][2] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  table[1][2] = TABLE_ELEMENT_INDICATE_STYLE;
  table[2][0] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  table[2][1] = TABLE_ELEMENT_INDICATE_STYLE;
  return table;
};

const random = max => Math.floor(Math.random() * max);

export default state => {
  const size = mock.size;
  const resource = mock.resource;
  const sequence = Array(size)
    .fill(resource.length)
    .map(num => resource[random(num)])
    .join("");

  const compared = createComparedTable(sequence);
  const count = (state && state.count) || 0;
  return {
    table: createDisplayTable(sequence),
    styles: createStyleTable(sequence),
    compared: compared.truth,
    marks: compared.marks,
    score: size,
    buttons: ["TRUE", "FALSE"],
    title: "Longest Palindromic Substring",
    modalTitle: "Longest Palindromic Substring",
    modalBody: modalBody,
    row: 2,
    col: 2,
    steps: 0,
    errors: 0,
    showModal: false,
    length: 1,
    helpers: [],
    count: count,
    id: 12,
    success: false
  };
};
