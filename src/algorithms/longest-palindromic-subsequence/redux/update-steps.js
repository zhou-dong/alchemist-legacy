import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_HELPER_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_ERROR_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE,
  TABLE_ELEMENT_HELPER_STYLE_TWO,
  TABLE_ELEMENT_HELPER_STYLE_THREE
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
const addIndicateStyle = (styles, nextRow, nextLength, table) => {
  updateRange(styles, 0, nextRow, nextLength, TABLE_ELEMENT_SUB_INDICATE_STYLE);
  updateRange(styles, 1, nextRow, nextLength, TABLE_ELEMENT_INDICATE_STYLE);
  if (nextLength === 1) return;
  if (table[1][nextRow] === table[1][nextRow + nextLength - 1]) {
    styles[1][nextRow] = TABLE_ELEMENT_HELPER_STYLE_TWO;
    styles[1][nextRow + nextLength - 1] = TABLE_ELEMENT_HELPER_STYLE_TWO;
    styles[nextRow][1] = TABLE_ELEMENT_HELPER_STYLE_TWO;
    styles[nextRow + nextLength - 1][1] = TABLE_ELEMENT_HELPER_STYLE_TWO;
  } else if (nextLength > 2) {
    const left = table[nextRow][nextRow + nextLength - 2];
    const right = table[nextRow + 1][nextRow + nextLength - 1];
    if (left < 2 && right < 2) return;
    const start = left > right ? nextRow : nextRow + 1;
    const style = TABLE_ELEMENT_HELPER_STYLE_THREE;
    updateRange(styles, 1, start, nextLength - 1, style);
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
  table
) => {
  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;

  resetIndicateStyle(styles);
  addIndicateStyle(styles, nextRow, nextLength, table);
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
  const nextHelpers = [];
  table[row][col] = action.payload;

  if (nonCorrect(state, action)) {
    styles[row][col] = TABLE_ELEMENT_ERROR_STYLE;
    const errors = state.errors + 1;
    return { ...state, table, styles, steps, errors };
  }

  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  if (isSuccess(state)) {
    cleanStyles(styles, helpers, row, col);
    styles[1] = Array(styles.length).fill(TABLE_ELEMENT_DISABLE_STYLE);
    styles.forEach(row => {
      row[1] = TABLE_ELEMENT_DISABLE_STYLE;
    });
    styles[0][1] = TABLE_ELEMENT_HELPER_STYLE;
    styles[1][0] = TABLE_ELEMENT_HELPER_STYLE;
    return { ...state, table, styles, steps };
  }

  const isNextLen = row + length === table.length;
  const nextLength = isNextLen ? length + 1 : length;
  const nextRow = isNextLen ? 2 : row + 1;
  const nextCol = isNextLen ? nextRow + nextLength - 1 : col + 1;

  if (nextLength > 2) {
    if (table[1][nextRow] === table[1][nextRow + nextLength - 1]) {
      const r = nextRow + 1;
      const c = nextRow + nextLength - 2;
      nextHelpers.push([r, c]);
    } else {
      nextHelpers.push([nextRow, nextRow + nextLength - 2]);
      nextHelpers.push([nextRow + 1, nextRow + nextLength - 1]);
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
    table
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
