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

const nonCorrect = (state, action) =>
  state.compared[state.row - 1][state.col - 1] !== action.payload;

const isSuccess = state =>
  isLastElementOfTable(state.table, state.row, state.col);

const updateStyles = (styles, row, col, nextRow, nextCol) => {
  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;

  styles[0][col] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[row][0] = TABLE_ELEMENT_DISABLE_STYLE;

  styles[0][nextCol] = TABLE_ELEMENT_INDICATE_STYLE;
  styles[nextRow[0]] = TABLE_ELEMENT_INDICATE_STYLE;
  return styles;
};

const highLightLastElement = styles => {
  const lastRow = styles[styles.length - 1];
  lastRow[lastRow.length - 1] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
};

const cleanStyles = styles => {
  highLightLastElement(styles);
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

  const isEnd = isEndColInTable(table, row, col);
  const nextRow = isEnd ? row + 1 : row;
  const nextCol = isEnd ? 2 : col + 1;

  updateStyles(styles, row, col, nextRow, nextCol);

  return {
    ...state,
    table,
    styles,
    steps,
    row: nextRow,
    col: nextCol
  };
};
