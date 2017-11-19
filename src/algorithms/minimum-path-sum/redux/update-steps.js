import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_HELPER_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_ERROR_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE
} from "presentational/constants";

import { clone2DArray } from "utils/generic-helper";

const nonCorrect = (state, action) => {
  return state.compared[state.row][state.col] !== action.payload;
};

const isSuccess = state => {
  const rowLen = state.table.length;
  const colLen = state.table[rowLen - 1].length;
  return state.row === rowLen - 1 && state.col === colLen - 1;
};

const updateStyles = (styles, row, col, nextRow, nextCol) => {
  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;
  return styles;
};

const cleanStyles = styles => {
  return styles;
};

export default (state, action) => {
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
    return { ...state, table, styles };
  }

  const isColEnd = col === state.table[row].length - 1;
  const isRowEnd = row === state.table.length - 1;

  let nextRow = 0;
  let nextCol = 0;

  const next = () => {
    if (row === 0 && col === 0) {
      nextRow = row;
      nextCol = col + 1;
    } else if (row !== 0 && col !== 0) {
      nextRow = isColEnd ? row + 1 : row;
      nextCol = isColEnd ? 1 : col + 1;
    } else {
      if (isColEnd) {
        nextRow = 1;
        nextCol = 0;
      } else if (isRowEnd) {
        nextRow = 1;
        nextCol = 1;
      } else {
        if (row === 0) {
          nextRow = 0;
          nextCol = col + 1;
        } else {
          nextRow = row + 1;
          nextCol = 0;
        }
      }
    }
  };

  next();
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
