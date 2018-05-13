import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_ERROR_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE
} from "presentational/constants";

import { clone2DArray, isLastElementOfTable } from "utils/generic-helper";
import { increaseCount } from "../../../axios";

const nonCorrect = (state, action) =>
  state.compared[state.row][state.col] !== action.payload;

const isSuccess = state =>
  isLastElementOfTable(state.table, state.row, state.col);

const updateStyles = (styles, row, col, nextRow, nextCol, state) => {
  styles[0] = Array(styles[0].length).fill(TABLE_ELEMENT_DISABLE_STYLE);
  styles[1][col] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[1][nextCol] = TABLE_ELEMENT_INDICATE_STYLE;
  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;
  const compared = state.compared;
  const start = compared[4][col];
  const end = compared[5][col];
  for (let i = start; i <= end; i += 1) {
    styles[0][i] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  }
  return styles;
};

const cleanStyles = styles => {
  styles[1][styles[1].length - 1] = TABLE_ELEMENT_DISABLE_STYLE;
  const lastRow = styles[styles.length - 1];
  lastRow[lastRow.length - 1] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  return styles;
};

export default (state, action) => {
  if (state.success) return state;

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
    cleanStyles(styles);
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

  let [nextRow, nextCol] = [0, 0];
  if (row === 2) {
    nextRow = 3;
    nextCol = col;
  } else {
    nextRow = 2;
    nextCol = col + 1;
  }

  updateStyles(styles, row, col, nextRow, nextCol, state);

  return {
    ...state,
    table,
    styles,
    steps,
    row: nextRow,
    col: nextCol
  };
};
