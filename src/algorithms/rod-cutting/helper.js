import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_DEFAULT_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_HELPER_STYLE_TWO
} from "presentational/constants";

import mock from "./__mock__/rod-cutting-mock.json";
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
  array.sort((a, b) => a - b);
  return array;
};

const createDisplayTable = (totalLength, prices) => {
  const table = [];
  const firstRow = ["PRICE", "LEN"].concat(
    Array.from(Array(totalLength + 1).keys())
  );
  const secondRow = Array(totalLength + 3).fill(0);
  table.push(firstRow);
  table.push(secondRow);
  prices.forEach(entry =>
    table.push(
      [entry.price, entry.length].concat(Array(totalLength + 1).fill(0))
    )
  );
  return table;
};

const createStyleTable = (totalLength, prices) => {
  const table = [];
  table.push(Array(totalLength + 3).fill(TABLE_ELEMENT_DISABLE_STYLE));
  table.push(
    [TABLE_ELEMENT_DISABLE_STYLE, TABLE_ELEMENT_DISABLE_STYLE].concat(
      Array(totalLength + 1).fill(TABLE_ELEMENT_SUCCESS_STYLE)
    )
  );
  for (let i = 0; i < prices.length; i += 1) {
    table.push(
      [
        TABLE_ELEMENT_DISABLE_STYLE,
        TABLE_ELEMENT_DISABLE_STYLE,
        TABLE_ELEMENT_SUCCESS_STYLE
      ].concat(Array(totalLength).fill(TABLE_ELEMENT_DEFAULT_STYLE))
    );
  }
  table[2][3] = TABLE_ELEMENT_ON_GOING_STYLE;
  table[0][3] = TABLE_ELEMENT_INDICATE_STYLE;
  table[1][3] = TABLE_ELEMENT_HELPER_STYLE_TWO;
  table[2][1] = TABLE_ELEMENT_INDICATE_STYLE;
  table[2][0] = TABLE_ELEMENT_HELPER_STYLE_TWO;
  if (prices[0].length === 1) {
    table[2][2] = TABLE_ELEMENT_HELPER_STYLE_TWO;
  }
  return table;
};

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default state => {
  const totalLength = mock.totalLength;
  const prices = shuffle(mock.prices);
  const compared = createComparedTable(totalLength, prices);
  const count = (state && state.count) || 0;
  return {
    table: createDisplayTable(totalLength, prices),
    styles: createStyleTable(totalLength, prices),
    compared: compared,
    score: totalLength,
    buttons: createButtons(compared),
    title: "Rod Cutting",
    modalTitle: "Rod Cutting",
    modalBody: modalBody,
    row: 2,
    col: 3,
    steps: 0,
    errors: 0,
    showModal: false,
    count: count,
    id: 19,
    success: false
  };
};
