import {
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_DISABLE_STYLE
} from "presentational/constants";
import { createStyleTableWithIndicator } from "utils/dp-helper";
import { arrayShuffle } from "utils/generic-helper";
import mock from "./__mock__/coin-changing-mock.json";
import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";

const createButtons = total => {
  const buttons = Array.from(Array(total + 1).keys());
  buttons[0] = "-1";
  return buttons;
};

const createDisplayTable = (total, coins) => {
  const firstRow = [""].concat(Array.from(Array(total + 1).keys()));
  firstRow[1] = "";
  const rowLen = firstRow.length;
  const table = [];
  table.push(firstRow);
  table.push(["", ""].concat(Array(rowLen - 2).fill("-1")));
  coins.forEach(coin => {
    table.push([coin, 0].concat(Array(rowLen - 2).fill("")));
  });
  return table;
};

const createStyleTable = (total, coins) => {
  const row = Array(total).fill("x");
  const col = Array(coins.length).fill("x");
  const table = createStyleTableWithIndicator(row, col);
  table[1] = Array(total + 2).fill(TABLE_ELEMENT_SUCCESS_STYLE);
  table.forEach(row => (row[1] = TABLE_ELEMENT_SUCCESS_STYLE));
  table[0][1] = TABLE_ELEMENT_DISABLE_STYLE;
  table[1][0] = TABLE_ELEMENT_DISABLE_STYLE;
  return table;
};

export default state => {
  const total = mock.total;
  const coins = arrayShuffle(mock.coins);
  const count = (state && state.count) || 0;
  return {
    table: createDisplayTable(total, coins),
    styles: createStyleTable(total, coins),
    compared: createComparedTable(total, coins),
    score: total,
    buttons: createButtons(total),
    title: "Coin Change (Fewest Number)",
    modalTitle: "Coin Change (Fewest Number)",
    modalBody: modalBody,
    row: 2,
    col: 2,
    steps: 0,
    errors: 0,
    showModal: false,
    coins: coins,
    id: 7,
    success: false,
    count: count
  };
};
