import {
  createDPTableWithoutIndicator,
  createStyleTableWithoutIndicator
} from "utils/dp-helper";

import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE
} from "presentational/constants";

import mock from "./__mock__/wildcard-matching-mock.json";
import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";

const createDisplayTable = (pattern, text) => {
  const table = createDPTableWithoutIndicator(pattern, text);
  table.forEach((row, index) => {
    if (index === 1) {
      row[1] = "T";
    } else if (index > 1) {
      row[1] = "F";
    }
  });
  return table;
};

const createStyleTable = (pattern, text) => {
  const table = createStyleTableWithoutIndicator(pattern, text);
  table.forEach((row, index) => {
    if (index === 0) {
      row[1] = TABLE_ELEMENT_DISABLE_STYLE;
    } else {
      row[1] = TABLE_ELEMENT_SUCCESS_STYLE;
    }
  });
  table[0][2] = TABLE_ELEMENT_INDICATE_STYLE;
  table[1][2] = TABLE_ELEMENT_ON_GOING_STYLE;
  return table;
};

const random = max => Math.floor(Math.random() * max);

const randomString = size => {
  const text = mock.text;
  let result = "";
  for (let i = 0; i < size; i += 1) {
    result += text.charAt(random(text.length));
  }
  return result;
};

const getPattern = () => {
  const size = mock.size;
  const result = randomString(size).split("");
  result[random(size)] = "*";
  result[random(size)] = "?";
  return result.join("");
};

const getText = () => randomString(mock.size);

export default state => {
  const pattern = getPattern();
  const text = getText();
  const count = (state && state.count) || 0;
  return {
    table: createDisplayTable(pattern, text),
    styles: createStyleTable(pattern, text),
    compared: createComparedTable(pattern, text),
    score: text.length,
    buttons: ["TRUE", "FALSE"],
    title: "Wildcard Matching",
    modalTitle: "Wildcard Matching",
    modalBody: modalBody,
    row: 1,
    col: 2,
    steps: 0,
    errors: 0,
    showModal: false,
    count: count,
    id: 18,
    success: false
  };
};
