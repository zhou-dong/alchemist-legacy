import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_ERROR_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE
} from "presentational/constants";

import {
  clone2DArray,
  isEndColInTable,
  isLastElementOfTable
} from "utils/generic-helper";

const nonCorrect = (state, action) => {
  return state.compared[state.row - 1][state.col - 1] !== action.payload;
};

const isSuccess = state => {
  return isLastElementOfTable(state.table, state.row, state.col);
};

const clearPreviousIndicate = (styles, row, col) => {
  styles[0][col] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[row][0] = TABLE_ELEMENT_DISABLE_STYLE;
};

const addNextIndicate = (styles, nextRow, nextCol) => {
  styles[0][nextCol] = TABLE_ELEMENT_INDICATE_STYLE;
  styles[nextRow][0] = TABLE_ELEMENT_INDICATE_STYLE;
};

const cleanHelper = (styles, helpers) => {
  helpers.forEach(pos => {
    styles[pos[0]][pos[1]] = TABLE_ELEMENT_SUCCESS_STYLE;
  });
};

const updateHelpers = (styles, helpers, nextHelpers) => {
  cleanHelper(styles, helpers);
  nextHelpers.forEach(pos => {
    styles[pos[0]][pos[1]] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  });
};

const updateStyles = (
  styles,
  row,
  col,
  nextRow,
  nextCol,
  helpers,
  nextHelpers
) => {
  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;

  clearPreviousIndicate(styles, row, col);
  addNextIndicate(styles, nextRow, nextCol);
  updateHelpers(styles, helpers, nextHelpers);
  return styles;
};

const cleanStyles = (styles, helpers) => {
  cleanHelper(styles, helpers);
  const lastRow = styles[styles.length - 1];
  lastRow[lastRow.length - 1] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  return styles;
};

export default (state, action) => {
  const styles = clone2DArray(state.styles);
  const table = clone2DArray(state.table);
  const row = state.row;
  const col = state.col;
  const steps = state.steps + 1;
  const helpers = state.helpers;
  const nextHelpers = [];
  table[row][col] = action.payload;

  if (nonCorrect(state, action)) {
    styles[row][col] = TABLE_ELEMENT_ERROR_STYLE;
    const errors = state.errors + 1;
    return { ...state, table, styles, steps, errors };
  }

  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  if (isSuccess(state)) {
    cleanStyles(styles, helpers);
    return { ...state, table, styles, steps };
  }

  const isEnd = isEndColInTable(table, row, col);
  const nextRow = isEnd ? row + 1 : row;
  const nextCol = isEnd ? 2 : col + 1;

  const coin = table[nextRow][0];
  const current = table[0][nextCol];
  nextHelpers.push([nextRow - 1, nextCol]);
  if (coin <= current) {
    nextHelpers.push([nextRow, current - coin + 1]);
  }

  updateStyles(styles, row, col, nextRow, nextCol, helpers, nextHelpers);

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
