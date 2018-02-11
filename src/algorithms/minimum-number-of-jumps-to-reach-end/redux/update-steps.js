import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_ERROR_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE
} from "presentational/constants";

import { clone2DArray, isLastElementOfTable } from "utils/generic-helper";

const nonCorrect = (state, action) =>
  state.compared[state.row - 2][state.col - 1] !== action.payload;

const isSuccess = state =>
  isLastElementOfTable(state.compared, state.row - 1, state.col - 1);

const disables = length => Array(length).fill(TABLE_ELEMENT_DISABLE_STYLE);

const updateStyles = (styles, row, col, nextRow, nextCol, state) => {
  styles[2][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[2][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;

  styles[0] = disables(styles[0].length);
  styles[0][nextCol] = TABLE_ELEMENT_INDICATE_STYLE;
  styles[0][nextRow - 1] = TABLE_ELEMENT_INDICATE_STYLE;

  const jumpSize = state.table[1][nextRow - 1];
  styles[1] = disables(styles[1].length);
  for (let i = nextRow; i < nextRow + jumpSize; i += 1) {
    styles[1][i] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  }

  return styles;
};

const highLightLastElement = styles => {
  const lastRow = styles[styles.length - 1];
  lastRow[lastRow.length - 1] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
};

const cleanStyles = styles => {
  highLightLastElement(styles);
  styles[0] = disables(styles[0].length);
  styles[1] = disables(styles[0].length);
  return styles;
};

export default (state, action) => {
  const styles = clone2DArray(state.styles);
  const table = clone2DArray(state.table);
  const row = state.row;
  const col = state.col;
  const steps = state.steps + 1;
  table[2][col] = action.payload;

  if (nonCorrect(state, action)) {
    styles[1][col] = TABLE_ELEMENT_ERROR_STYLE;
    const errors = state.errors + 1;
    return { ...state, table, styles, steps, errors };
  }

  styles[2][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  if (isSuccess(state)) {
    cleanStyles(styles);
    return { ...state, table, styles, steps };
  }

  let nextRow = 0;
  let nextCol = 0;
  if (row === col) {
    nextRow = 2;
    nextCol = col + 1;
  } else {
    nextRow = row + 1;
    nextCol = col;
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
