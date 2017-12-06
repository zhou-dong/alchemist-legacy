import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE
} from "presentational/constants";
import { createStyleTableWithIndicator } from "utils/dp-helper";
import mock from "./__mock__/coin-change-mock.json";
import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";
import { arrayShuffle } from "utils/generic-helper";

const createButtons = compared => {
  const result = [];
  for (let row = 1; row < compared.length; row += 1) {
    for (let col = 1; col < compared[row].length; col += 1) {
      const element = compared[row][col];
      if (!result.includes(element)) {
        result.push(element);
      }
    }
  }
  return result;
};

const createDisplayTable = (total, coins) => {
  const table = [];
  table.push([""].concat(Array.from(Array(total + 1).keys())));
  table.push(["", ""].concat(Array(total).fill(0)));
  coins.forEach(coin => {
    table.push([coin, 1].concat(Array(total).fill("")));
  });
  table[0][1] = "";
  return table;
};

const createStyleTable = (total, coins, helpers) => {
  const row = Array(total).fill("x");
  const col = Array(coins.length).fill("x");
  const table = createStyleTableWithIndicator(row, col);
  table[1] = Array(total + 2).fill(TABLE_ELEMENT_SUCCESS_STYLE);
  table.forEach(row => (row[1] = TABLE_ELEMENT_SUCCESS_STYLE));
  table[0][1] = TABLE_ELEMENT_DISABLE_STYLE;
  table[1][0] = TABLE_ELEMENT_DISABLE_STYLE;
  helpers.forEach(pos => {
    table[pos[0]][pos[1]] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  });
  return table;
};

export default () => {
  const total = mock.total;
  const coins = arrayShuffle(mock.coins);
  const compared = createComparedTable(total, coins);
  const helpers = [[1, 2]];
  if (coins[0] === 1) {
    helpers.push([2, 1]);
  }
  return {
    table: createDisplayTable(total, coins),
    styles: createStyleTable(total, coins, helpers),
    compared: compared,
    score: total,
    buttons: createButtons(compared),
    title: "Coin Change (How Many Ways)",
    modalTitle: "Coin Change (How Many Ways)",
    modalBody: modalBody,
    row: 2,
    col: 2,
    steps: 0,
    errors: 0,
    showModal: false,
    helpers: helpers
  };
};
