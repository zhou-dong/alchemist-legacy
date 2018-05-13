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
import { increaseCount } from "../../../axios";

const nonCorrect = (state, action) => {
  const payload = action.payload === "TRUE" ? true : false;
  return state.compared[state.row - 2][state.col - 2] !== payload;
};

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
  styles[0][0] = TABLE_ELEMENT_HELPER_STYLE_THREE;
  return styles;
};

const cleanStyles = (styles, helpers, row, col) => {
  cleanHelper(styles, helpers);
  styles[row][col] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  return styles;
};

export default (state, action) => {
  if (state.success) return state;

  const styles = clone2DArray(state.styles);
  const table = clone2DArray(state.table);
  const row = state.row;
  const col = state.col;
  const steps = state.steps + 1;
  const helpers = state.helpers;
  const length = state.length;
  const nextHelpers = [];
  const marks = state.marks;
  table[row][col] = action.payload === "TRUE" ? "T" : "F";

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
    increaseCount(state.id);
    return {
      ...state,
      table,
      styles,
      steps,
      count: state.count + 1,
      success: true
    };
  }

  const isNextLen = row + length === table.length;
  const nextLength = isNextLen ? length + 1 : length;
  const nextRow = isNextLen ? 2 : row + 1;
  const nextCol = isNextLen ? nextRow + nextLength - 1 : col + 1;

  if (
    nextLength > 2 &&
    table[1][nextRow] === table[1][nextRow + nextLength - 1]
  ) {
    nextHelpers.push([nextRow + 1, nextRow + nextLength - 2]);
  }

  table[0][0] = marks[row - 2][col - 2];

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
