import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_HELPER_STYLE_TWO,
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
  state.compared[state.row - 1][state.col - 2] !== action.payload;

const isSuccess = (table, row, col) => isLastElementOfTable(table, row, col);

const updateStyles = (styles, row, col, nextRow, nextCol, table) => {
  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;

  styles[0][col] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[row][0] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[row][1] = TABLE_ELEMENT_DISABLE_STYLE;

  styles[0][nextCol] = TABLE_ELEMENT_INDICATE_STYLE;
  styles[nextRow][0] = TABLE_ELEMENT_HELPER_STYLE_TWO;
  styles[nextRow][1] = TABLE_ELEMENT_INDICATE_STYLE;

  styles[row - 1][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[nextRow - 1][nextCol] = TABLE_ELEMENT_HELPER_STYLE_TWO;

  const currentLength = table[0][col];
  const comparedLength = table[row][1];

  if (currentLength >= comparedLength) {
    styles[row][
      currentLength - comparedLength + 2
    ] = TABLE_ELEMENT_SUCCESS_STYLE;
  }

  if (table[0][nextCol] - table[nextRow][1] >= 0) {
    styles[nextRow][
      nextCol - table[nextRow][1]
    ] = TABLE_ELEMENT_HELPER_STYLE_TWO;
  }

  return styles;
};

const highLightLastElement = styles => {
  const lastRow = styles[styles.length - 1];
  lastRow[lastRow.length - 1] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
};

const cleanStyles = styles => {
  const secondLastRow = styles[styles.length - 2];
  secondLastRow[secondLastRow.length - 1] = TABLE_ELEMENT_SUCCESS_STYLE;
  const lastRow = styles[styles.length - 1];
  for (let col = 2; col < lastRow.length; col += 1) {
    lastRow[col] = TABLE_ELEMENT_SUCCESS_STYLE;
  }
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
  if (isSuccess(table, row, col)) {
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
  const nextCol = isEnd ? 3 : col + 1;

  updateStyles(styles, row, col, nextRow, nextCol, table);

  return {
    ...state,
    table,
    styles,
    steps,
    row: nextRow,
    col: nextCol
  };
};
