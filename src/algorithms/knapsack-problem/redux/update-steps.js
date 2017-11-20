import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_HELPER_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_ERROR_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE
} from "presentational/constants";

import { clone2DArray } from "utils/generic-helper";

const nonCorrect = (state, action) => {
  const comparedTable = state.compared;
  const payload = action.payload;
  const row = state.row;
  const col = state.col;
  return comparedTable[row][col - 2] !== payload;
};

const isSuccess = state => {
  const table = state.table;
  const row = state.row;
  const col = state.col;
  return row === table.length - 1 && col === table[row].length - 1;
};

const updateStyles = (styles, row, col, nextRow, nextCol, items) => {
  styles[row][0] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[row][1] = TABLE_ELEMENT_DISABLE_STYLE;

  styles[nextRow][1] = TABLE_ELEMENT_INDICATE_STYLE;

  styles[0][col] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[0][nextCol] = TABLE_ELEMENT_INDICATE_STYLE;

  styles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;

  styles[row - 1][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[nextRow - 1][nextCol] = TABLE_ELEMENT_HELPER_STYLE;

  const currItem = items[row - 2];
  const nextItem = items[nextRow - 2];

  if (col - 2 >= currItem.weight) {
    styles[row - 1][col - currItem.weight] = TABLE_ELEMENT_SUCCESS_STYLE;
  }

  if (nextCol - 2 >= nextItem.weight) {
    styles[nextRow][0] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
    styles[nextRow - 1][
      nextCol - nextItem.weight
    ] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  }

  return styles;
};

const cleanStyles = (styles, rowIndex, colIndex) => {
  for (let row = 1; row < styles.length; row += 1) {
    for (let col = 2; col < styles[row].length; col += 1) {
      styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
    }
  }
  styles[styles.length - 1][0] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[rowIndex][colIndex] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
};

export default (state, action) => {
  const styles = clone2DArray(state.styles);
  const table = clone2DArray(state.table);
  const row = state.row;
  const col = state.col;
  const steps = state.steps + 1;
  table[row][col] = action.payload;

  if (nonCorrect(state, action)) {
    styles[row][col] = TABLE_ELEMENT_ERROR_STYLE;
    const errors = state.errors + 1;
    return { ...state, table, styles, steps, errors };
  }

  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  if (isSuccess(state)) {
    cleanStyles(styles, row, col);
    return { ...state, table, styles, steps };
  }

  const isEnd = col === table[row].length - 1;
  const nextRow = isEnd ? row + 1 : row;
  const nextCol = isEnd ? 3 : col + 1;

  updateStyles(styles, row, col, nextRow, nextCol, state.items);

  return {
    ...state,
    table,
    styles,
    steps,
    row: nextRow,
    col: nextCol
  };
};
