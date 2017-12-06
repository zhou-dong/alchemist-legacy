import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_HELPER_STYLE,
  TABLE_ELEMENT_ERROR_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE,
  TABLE_ELEMENT_HELPER_STYLE_TWO,
  TABLE_ELEMENT_HELPER_STYLE_THREE
} from "presentational/constants";

import { clone2DArray, isLastElementOfTable } from "utils/generic-helper";

const nonCorrect = (state, action) =>
  state.compared[state.row - 2][state.col - 2] !== action.payload;

const isSuccess = state =>
  isLastElementOfTable(state.table, state.row, state.col + 1);

const clearPreviousIndicate = (styles, row, col) => {
  styles[0][col] = TABLE_ELEMENT_HELPER_STYLE;
  styles[row][0] = TABLE_ELEMENT_HELPER_STYLE;
  styles[1][col] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[row][1] = TABLE_ELEMENT_DISABLE_STYLE;
};

const addNextIndicate = (styles, nextRow, nextCol) => {
  styles[0][nextCol] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  styles[nextRow][0] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  styles[1][nextCol] = TABLE_ELEMENT_HELPER_STYLE_TWO;
  styles[nextRow][1] = TABLE_ELEMENT_HELPER_STYLE_TWO;
};

const updateStyles = (styles, row, col, nextRow, nextCol) => {
  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;
  clearPreviousIndicate(styles, row, col);
  addNextIndicate(styles, nextRow, nextCol);
  return styles;
};

const cleanHelper = (styles, helpers) => {
  helpers.forEach(pos => {
    styles[pos[0]][pos[1]] = TABLE_ELEMENT_SUCCESS_STYLE;
  });
};

const updateHelpers = (styles, helpers, nextHelpers) => {
  cleanHelper(styles, helpers);
  nextHelpers.forEach(pos => {
    styles[pos[0]][pos[1]] = TABLE_ELEMENT_HELPER_STYLE_THREE;
  });
};

const cleanStyles = (styles, row, col, helpers) => {
  clearPreviousIndicate(styles, row, col);
  cleanHelper(styles, helpers);
  const lastRow = styles[styles.length - 1];
  lastRow[lastRow.length - 2] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  return styles;
};

const updateMax = (state, table, row, col) => {
  table[0][0] = state.maxTable[row - 2][col - 2];
};

export default (state, action) => {
  const styles = clone2DArray(state.styles);
  const table = clone2DArray(state.table);
  const row = state.row;
  const col = state.col;
  const steps = state.steps + 1;
  table[row][col] = action.payload;
  const helpers = state.helpers;
  const nextHelpers = [];

  if (nonCorrect(state, action)) {
    styles[row][col] = TABLE_ELEMENT_ERROR_STYLE;
    const errors = state.errors + 1;
    return { ...state, table, styles, steps, errors };
  }

  updateMax(state, table, row, col);

  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  if (isSuccess(state)) {
    cleanStyles(styles, row, col, helpers);
    return { ...state, table, styles, steps };
  }

  const isEnd = row === col ? true : false;
  const nextRow = isEnd ? row + 1 : row;
  const nextCol = isEnd ? 3 : col + 1;

  const rowValue = table[nextRow][1];
  const colValue = table[1][nextCol];
  if (rowValue <= colValue) {
    nextHelpers.push([nextRow, nextCol - 1]);
  } else {
    nextHelpers.push([nextCol - 1, nextCol - 1]);
  }

  updateStyles(styles, row, col, nextRow, nextCol);
  updateHelpers(styles, helpers, nextHelpers);

  return {
    ...state,
    table,
    styles,
    steps,
    row: nextRow,
    col: nextCol,
    helpers: nextHelpers
  };
};
