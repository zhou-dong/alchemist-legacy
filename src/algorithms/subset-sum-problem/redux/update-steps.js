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

import { increaseCount } from "../../../axios";

const nonCorrect = (state, payload) =>
  state.compared[state.row - 1][state.col - 1] !== payload;

const isSuccess = state =>
  isLastElementOfTable(state.table, state.row, state.col);

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

  styles[0][col] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[row][0] = TABLE_ELEMENT_DISABLE_STYLE;

  styles[0][nextCol] = TABLE_ELEMENT_INDICATE_STYLE;
  styles[nextRow][0] = TABLE_ELEMENT_INDICATE_STYLE;

  helpers.forEach(pos => {
    styles[pos[0]][pos[1]] = TABLE_ELEMENT_SUCCESS_STYLE;
  });

  nextHelpers.forEach(pos => {
    styles[pos[0]][pos[1]] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  });
  return styles;
};

const cleanStyles = (styles, row, col, helpers) => {
  styles[row][col] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  helpers.forEach(pos => {
    styles[pos[0]][pos[1]] = TABLE_ELEMENT_SUCCESS_STYLE;
  });
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
  const nextHelpers = [];

  const payload = action.payload === "TRUE" ? true : false;
  table[row][col] = action.payload === "TRUE" ? "T" : "F";

  if (nonCorrect(state, payload)) {
    styles[row][col] = TABLE_ELEMENT_ERROR_STYLE;
    const errors = state.errors + 1;
    return { ...state, table, styles, steps, errors };
  }

  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  if (isSuccess(state)) {
    increaseCount(state.id);
    cleanStyles(styles, row, col, helpers);
    return {
      ...state,
      table,
      styles,
      steps,
      count: state.count + 1,
      success: true
    };
  }

  const isEnd = isEndColInTable(table, row, col);
  const nextRow = isEnd ? row + 1 : row;
  const nextCol = isEnd ? 2 : col + 1;

  const arrElement = table[nextRow][0];
  const weight = table[0][nextCol];

  if (arrElement > weight) {
    nextHelpers.push([nextRow - 1, nextCol]);
  } else {
    if (table[nextRow - 1][nextCol] === "T") {
      nextHelpers.push([nextRow - 1, nextCol]);
    }
    if (table[nextRow - 1][weight + 1 - arrElement] === "T") {
      nextHelpers.push([nextRow - 1, weight + 1 - arrElement]);
    }
    if (nextHelpers.length === 0) {
      nextHelpers.push([nextRow - 1, nextCol]);
    }
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
