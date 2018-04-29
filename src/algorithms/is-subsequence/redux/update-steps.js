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

const payloadStr = action => (action.payload === "TRUE" ? "T" : "F");
const payloadVal = action => (action.payload === "TRUE" ? true : false);

const nonCorrect = (state, action) =>
  state.compared[state.row - 1][state.col - 1] !== payloadVal(action);

const isSuccess = state =>
  isLastElementOfTable(state.table, state.row, state.col);

const updateStyles = (styles, row, col, nextRow, nextCol, compared) => {
  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;

  styles[row - 1][col - 1] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[row][col - 1] = TABLE_ELEMENT_SUCCESS_STYLE;

  styles[0][col] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[0][nextCol] = TABLE_ELEMENT_INDICATE_STYLE;

  styles[row][0] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[nextRow][0] = TABLE_ELEMENT_INDICATE_STYLE;
  return styles;
};

const cleanStyles = (styles, row, col) => {
  styles[row][col] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  return styles;
};

export default (state, action) => {
  if (state.success) return state;

  const payload = payloadStr(action);
  const styles = clone2DArray(state.styles);
  const table = clone2DArray(state.table);
  const row = state.row;
  const col = state.col;
  const steps = state.steps + 1;
  table[row][col] = payload;

  if (nonCorrect(state, action)) {
    styles[row][col] = TABLE_ELEMENT_ERROR_STYLE;
    const errors = state.errors + 1;
    return { ...state, table, styles, steps, errors };
  }

  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  if (isSuccess(state)) {
    increaseCount(state.id);
    cleanStyles(styles, row, col);
    return {
      ...state,
      table,
      styles,
      steps,
      count: state.count + 1,
      success: true
    };
  }

  const isEnd = col === table[row].length - 1;
  const nextRow = isEnd ? row + 1 : row;
  const nextCol = isEnd ? 2 : col + 1;

  updateStyles(styles, row, col, nextRow, nextCol, state.compared);

  return {
    ...state,
    table,
    styles,
    steps,
    row: nextRow,
    col: nextCol
  };
};
