import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_HELPER_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_ERROR_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE,
  TABLE_ELEMENT_HELPER_STYLE_TWO
} from "presentational/constants";

import { clone2DArray } from "utils/generic-helper";

const nonCorrect = (state, action) =>
  state.compared[state.row - 2][state.col - 2] !== action.payload;

const isSuccess = state =>
  state.row === 2 && state.col === state.table[2].length - 1;

const resetIndicateStyle = styles => {
  styles[1] = Array(styles[1].length).fill(TABLE_ELEMENT_DISABLE_STYLE);
  styles.forEach(row => {
    row[0] = TABLE_ELEMENT_HELPER_STYLE;
    row[1] = TABLE_ELEMENT_DISABLE_STYLE;
  });
  styles[0] = Array(styles[0].length).fill(TABLE_ELEMENT_HELPER_STYLE);
};

const updateRange = (styles, row, start, length, style) => {
  for (let i = 0; i < length; i += 1) {
    styles[row][i + start] = style;
    styles[i + start][row] = style;
  }
};
const addIndicateStyle = (styles, nextRow, nextLength, table, palindrome) => {
  updateRange(styles, 0, nextRow, nextLength, TABLE_ELEMENT_SUB_INDICATE_STYLE);
  const [row, col] = [nextRow, nextRow + nextLength - 1];
  if (palindrome[row - 2][col - 2] === true) {
    updateRange(styles, 1, nextRow, nextLength, TABLE_ELEMENT_HELPER_STYLE_TWO);
  } else {
    updateRange(styles, 1, nextRow, nextLength, TABLE_ELEMENT_INDICATE_STYLE);
  }
};

const cleanHelper = (styles, helpers) => {
  helpers.forEach(pos => {
    styles[pos[0]][pos[1]] = TABLE_ELEMENT_SUCCESS_STYLE;
  });
};

const updateHelpers = (styles, helpers, nextHelpers) => {
  cleanHelper(styles, helpers);
  nextHelpers.forEach(pos => {
    styles[pos[0]][pos[1]] = TABLE_ELEMENT_HELPER_STYLE_TWO;
  });
};

const updateStyles = (
  styles,
  row,
  col,
  nextRow,
  nextCol,
  nextLength,
  helpers,
  nextHelpers,
  table,
  palindrome
) => {
  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;
  resetIndicateStyle(styles);
  addIndicateStyle(styles, nextRow, nextLength, table, palindrome);
  updateHelpers(styles, helpers, nextHelpers);
  return styles;
};

const cleanStyles = (styles, helpers, row, col) => {
  cleanHelper(styles, helpers);
  styles[row][col] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  return styles;
};

export default (state, action) => {
  const styles = clone2DArray(state.styles);
  const table = clone2DArray(state.table);
  const row = state.row;
  const col = state.col;
  const steps = state.steps + 1;
  const length = state.length;
  const helpers = state.helpers;
  let nextHelpers = [];
  const palindromeTable = state.palindromeTable;
  table[row][col] = action.payload;

  if (nonCorrect(state, action)) {
    styles[row][col] = TABLE_ELEMENT_ERROR_STYLE;
    const errors = state.errors + 1;
    return { ...state, table, styles, steps, errors };
  }

  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  if (isSuccess(state)) {
    cleanStyles(styles, helpers, row, col);
    return { ...state, table, styles, steps };
  }

  const isNextLen = row + length === table.length;
  const nextLength = isNextLen ? length + 1 : length;
  const nextRow = isNextLen ? 2 : row + 1;
  const nextCol = isNextLen ? nextRow + nextLength - 1 : col + 1;

  if (palindromeTable[nextRow - 2][nextCol - 2] !== true) {
    let min = table.length;
    for (let i = nextRow; i < nextCol; i += 1) {
      const partition = table[nextRow][i] + table[i + 1][nextCol];
      if (min > partition) {
        min = partition;
        nextHelpers = [[nextRow, i], [i + 1, nextCol]];
      }
    }
  }

  updateStyles(
    styles,
    row,
    col,
    nextRow,
    nextCol,
    nextLength,
    helpers,
    nextHelpers,
    table,
    palindromeTable
  );

  return {
    ...state,
    table,
    styles,
    steps,
    row: nextRow,
    col: nextCol,
    length: nextLength,
    helpers: nextHelpers
  };
};
