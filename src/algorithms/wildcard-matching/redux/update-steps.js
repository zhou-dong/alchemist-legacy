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
  const payload = action.payload === "TRUE" ? true : false;
  return state.compared[state.row - 1][state.col - 1] !== payload;
};

const isSuccess = state =>
  isLastElementOfTable(state.table, state.row, state.col);

const removeIndicates = (styles, row, col) => {
  styles[0][col] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[row][0] = TABLE_ELEMENT_DISABLE_STYLE;
};

const addIndicates = (styles, nextRow, nextCol) => {
  styles[0][nextCol] = TABLE_ELEMENT_INDICATE_STYLE;
  styles[nextRow][0] = TABLE_ELEMENT_INDICATE_STYLE;
};

const updateStyles = (styles, row, col, nextRow, nextCol) => {
  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;
  removeIndicates(styles, row, col);
  addIndicates(styles, nextRow, nextCol);
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
  const styles = clone2DArray(state.styles);
  const table = clone2DArray(state.table);
  const row = state.row;
  const col = state.col;
  const steps = state.steps + 1;
  table[row][col] = action.payload === "TRUE" ? "T" : "F";

  if (nonCorrect(state, action)) {
    styles[row][col] = TABLE_ELEMENT_ERROR_STYLE;
    const errors = state.errors + 1;
    return { ...state, table, styles, steps, errors };
  }

  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  if (isSuccess(state)) {
    cleanStyles(styles);
    return { ...state, table, styles, steps };
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
