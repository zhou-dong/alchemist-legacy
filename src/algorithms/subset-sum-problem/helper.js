import mock from "./__mock__/subset-sum-problem-mock.json";
import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";

import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_DEFAULT_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE
} from "presentational/constants";

const random = max => Math.floor(Math.random() * max) + 1;

const createDisplayTable = (totals, array) => {
  const table = [];
  const len = totals.length;
  table.push(["", ""].concat(totals));
  table.push(["", "T"].concat(Array(len).fill("F")));
  array.forEach(num => {
    table.push([num, "T"].concat(Array(len).fill("")));
  });
  return table;
};

const createStyleTable = (totals, array, hepler) => {
  const table = [];
  const cols = totals.length + 2;
  table.push(Array(cols).fill(TABLE_ELEMENT_DISABLE_STYLE));
  table.push(
    [TABLE_ELEMENT_DISABLE_STYLE, TABLE_ELEMENT_SUCCESS_STYLE].concat(
      Array(cols - 2).fill(TABLE_ELEMENT_SUCCESS_STYLE)
    )
  );
  array.forEach(() => {
    table.push(
      [TABLE_ELEMENT_DISABLE_STYLE, TABLE_ELEMENT_SUCCESS_STYLE].concat(
        Array(cols - 2).fill(TABLE_ELEMENT_DEFAULT_STYLE)
      )
    );
  });
  table[2][2] = TABLE_ELEMENT_ON_GOING_STYLE;
  table[0][2] = TABLE_ELEMENT_INDICATE_STYLE;
  table[2][0] = TABLE_ELEMENT_INDICATE_STYLE;
  table[hepler[0]][hepler[1]] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  return table;
};

export default state => {
  const [size, total, max] = [mock.size, mock.total, mock.max];
  const totals = Array.from(Array(total + 1).keys());
  totals.shift();
  const array = Array(size)
    .fill(max)
    .map(n => random(n));
  const helper = array[0] === 1 ? [1, 1] : [1, 2];
  const count = (state && state.count) || 0;
  return {
    table: createDisplayTable(totals, array),
    styles: createStyleTable(totals, array, helper),
    compared: createComparedTable(totals, array),
    score: total,
    buttons: ["TRUE", "FALSE"],
    title: "Subset Sum Problem",
    modalTitle: "Subset Sum Problem",
    modalBody: modalBody,
    row: 2,
    col: 2,
    steps: 0,
    errors: 0,
    showModal: false,
    helpers: [helper],
    id: 11,
    success: false,
    count: count
  };
};
