import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_DEFAULT_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE
} from "presentational/constants";

import mock from "./__mock__/egg-dropping-problem-mock.json";
import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";

const createButtons = floors => {
  const btns = Array.from(Array(floors + 1).keys());
  btns.shift();
  return btns;
};

const createDisplayTable = (eggs, floors) => {
  const range = size => Array.from(Array(size).keys());
  const table = [];
  table.push(["EG\\FL"].concat(range(floors + 1)));
  table.push([1].concat(range(floors + 1)));
  for (let i = 1; i < eggs; i += 1) {
    table.push([i + 1].concat(Array(floors + 1).fill(0)));
  }
  return table;
};

const createStyleTable = (eggs, floors) => {
  const table = [];
  table.push(Array(floors + 2).fill(TABLE_ELEMENT_DISABLE_STYLE));
  table.push(Array(floors + 2).fill(TABLE_ELEMENT_SUCCESS_STYLE));
  for (let row = 1; row < eggs; row += 1) {
    const style = [
      TABLE_ELEMENT_DISABLE_STYLE,
      TABLE_ELEMENT_SUCCESS_STYLE
    ].concat(Array(floors).fill(TABLE_ELEMENT_DEFAULT_STYLE));
    table.push(style);
  }
  table[1][0] = TABLE_ELEMENT_DISABLE_STYLE;
  table[2][2] = TABLE_ELEMENT_ON_GOING_STYLE;
  table[2][0] = TABLE_ELEMENT_INDICATE_STYLE;
  table[0][2] = TABLE_ELEMENT_INDICATE_STYLE;
  return table;
};

export default () => {
  const eggs = mock.eggs;
  const floors = mock.floors;
  return {
    table: createDisplayTable(eggs, floors),
    styles: createStyleTable(eggs, floors),
    compared: createComparedTable(eggs, floors),
    score: floors,
    buttons: createButtons(floors),
    title: "Egg Dropping Problem",
    modalTitle: "Egg Dropping Problem",
    modalBody: modalBody,
    row: 2,
    col: 2,
    steps: 0,
    errors: 0,
    showModal: false
  };
};
