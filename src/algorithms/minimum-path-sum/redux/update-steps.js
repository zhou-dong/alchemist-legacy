import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_ERROR_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE
} from "presentational/constants";

import { clone2DArray } from "utils/generic-helper";
import { increaseCount } from "../../../axios";

const nonCorrect = (state, action) => {
  return state.compared[state.row][state.col] !== action.payload;
};

const isSuccess = state => {
  const rowLen = state.table.length;
  const colLen = state.table[rowLen - 1].length;
  return state.row === rowLen - 1 && state.col === colLen - 1;
};

const updateStyles = (
  styles,
  displayTableStyles,
  row,
  col,
  nextRow,
  nextCol
) => {
  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;
  displayTableStyles[row][col] = TABLE_ELEMENT_DISABLE_STYLE;
  displayTableStyles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;
  return styles;
};

const cleanStyles = (displayTableStyles, styles, rowIndex, colIndex) => {
  const row = displayTableStyles.length;
  const col = displayTableStyles[row - 1].length;
  displayTableStyles[row - 1][col - 1] = TABLE_ELEMENT_DISABLE_STYLE;
  for (let row = 0; row < styles.length; row += 1) {
    for (let col = 0; col < styles[row].length; col += 1) {
      styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
    }
  }
  styles[rowIndex][colIndex] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
};

export default (state, action) => {
  if (state.success) return state;

  const styles = clone2DArray(state.styles);
  const table = clone2DArray(state.table);
  const displayTableStyles = clone2DArray(state.displayTableStyles);
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
    cleanStyles(displayTableStyles, styles, row, col);
    increaseCount(state.id);
    return {
      ...state,
      table,
      styles,
      displayTableStyles,
      steps,
      count: state.count + 1,
      success: true
    };
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
  updateStyles(styles, displayTableStyles, row, col, nextRow, nextCol);

  if (row === 0 && !isColEnd) {
    styles[row][col - 1] = TABLE_ELEMENT_SUCCESS_STYLE;
    styles[row][col] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  }
  if (row === 0 && isColEnd) {
    styles[row][col - 1] = TABLE_ELEMENT_SUCCESS_STYLE;
    styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
    styles[0][0] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  }
  if (col === 0 && !isRowEnd) {
    styles[row - 1][col] = TABLE_ELEMENT_SUCCESS_STYLE;
    styles[row][col] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  }
  if (col === 0 && isRowEnd) {
    styles[row - 1][col] = TABLE_ELEMENT_SUCCESS_STYLE;
    styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  }
  if (row !== 0 && col !== 0) {
    styles[row - 1][col] = TABLE_ELEMENT_SUCCESS_STYLE;
    styles[row][col - 1] = TABLE_ELEMENT_SUCCESS_STYLE;
  }
  if (nextRow !== 0 && nextCol !== 0) {
    styles[nextRow - 1][nextCol] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
    styles[nextRow][nextCol - 1] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  }
  return {
    ...state,
    table,
    styles,
    steps,
    row: nextRow,
    col: nextCol,
    displayTableStyles
  };
};
