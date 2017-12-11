import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_ERROR_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE,
  TABLE_ELEMENT_HELPER_STYLE_TWO,
  TABLE_ELEMENT_HELPER_STYLE_THREE
} from "presentational/constants";

import { clone2DArray, isLastElementOfTable } from "utils/generic-helper";

const nonCorrect = (state, action) =>
  state.compared[state.row][state.col] !== action.payload;

const isSuccess = state =>
  isLastElementOfTable(state.compared, state.row, state.col);

const addIndicate = (styles, col, style, style2) => {
  styles[0][col] = style;
  styles[1][col] = style2;
};

const addIndicates = (styles, nextRow, nextCol) => {
  addIndicate(
    styles,
    nextRow,
    TABLE_ELEMENT_HELPER_STYLE_TWO,
    TABLE_ELEMENT_HELPER_STYLE_THREE
  );
  addIndicate(
    styles,
    nextCol,
    TABLE_ELEMENT_SUB_INDICATE_STYLE,
    TABLE_ELEMENT_HELPER_STYLE_THREE
  );
};

const removeIndicate = (styles, col) => {
  styles[0][col] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[1][col] = TABLE_ELEMENT_SUCCESS_STYLE;
};

const removeIndicates = (styles, row, col) => {
  removeIndicate(styles, row);
  removeIndicate(styles, col);
};

const getMax = maxTable => {
  const lastRow = maxTable[maxTable.length - 1];
  return lastRow[lastRow.length - 1];
};

const highLightResult = (table, maxTable, styles) => {
  const max = getMax(maxTable);
  table[table.length - 1].forEach((val, i) => {
    styles[1][i] = TABLE_ELEMENT_SUCCESS_STYLE;
    if (val === max) {
      styles[1][i] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
    }
  });
};

const updateStyles = (styles, row, col, nextRow, nextCol) => {
  styles[1][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[1][nextRow] = TABLE_ELEMENT_HELPER_STYLE_THREE;
  removeIndicates(styles, row, col - 1);
  addIndicates(styles, nextRow, nextCol - 1);
};

const cleanStyles = (styles, row, col, maxTable, table) => {
  removeIndicates(styles, row, col);
  const colIndex = styles[0].length - 2;
  styles[0][colIndex] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[1][colIndex] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[1][colIndex + 1] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  highLightResult(table, maxTable, styles);
};

export default (state, action) => {
  const styles = clone2DArray(state.styles);
  const table = clone2DArray(state.table);
  const row = state.row;
  const col = state.col;
  const steps = state.steps + 1;
  table[1][row] = action.payload;

  if (nonCorrect(state, action)) {
    styles[1][row] = TABLE_ELEMENT_ERROR_STYLE;
    const errors = state.errors + 1;
    return { ...state, table, styles, steps, errors };
  }

  styles[1][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  if (isSuccess(state)) {
    cleanStyles(styles, row, col, state.maxTable, table);
    return { ...state, table, styles, steps };
  }

  const isEnd = row === col ? true : false;
  const nextRow = isEnd ? row + 1 : row;
  const nextCol = isEnd ? 1 : col + 1;

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
