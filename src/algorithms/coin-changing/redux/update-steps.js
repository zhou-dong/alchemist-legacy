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
  const payload = "-1" === action.payload ? Infinity : action.payload;
  return state.compared[state.row - 1][state.col - 1] !== payload;
};

const isSuccess = state => {
  return isLastElementOfTable(state.table, state.row, state.col);
};

const updateStyles = (styles, row, col, nextRow, nextCol, coin) => {
  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  styles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;

  styles[0][col] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[0][nextCol] = TABLE_ELEMENT_INDICATE_STYLE;

  styles[row][0] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[nextRow][0] = TABLE_ELEMENT_INDICATE_STYLE;

  styles[1] = Array(styles[1].length).fill(TABLE_ELEMENT_SUCCESS_STYLE);
  styles.forEach(row => (row[1] = TABLE_ELEMENT_SUCCESS_STYLE));

  styles[0][1] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[1][0] = TABLE_ELEMENT_DISABLE_STYLE;

  styles[row - 1][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  if (col - coin > 0) {
    styles[row][col - coin] = TABLE_ELEMENT_SUCCESS_STYLE;
  }
  styles[row - 1][col] = TABLE_ELEMENT_SUCCESS_STYLE;

  return styles;
};

const cleanStyles = styles => {
  const rows = styles.length;
  const cols = styles[rows - 1].length;
  for (let col = 1; col < cols; col += 1) {
    styles[rows - 1][col] = TABLE_ELEMENT_SUCCESS_STYLE;
    styles[rows - 2][col] = TABLE_ELEMENT_SUCCESS_STYLE;
  }
  styles[rows - 1][cols - 1] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  return styles;
};

export default (state, action) => {
  const styles = clone2DArray(state.styles);
  const table = clone2DArray(state.table);
  const row = state.row;
  const col = state.col;
  const steps = state.steps + 1;
  const coins = state.coins;
  const compared = state.compared;

  table[row][col] = action.payload;

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

  updateStyles(styles, row, col, nextRow, nextCol, coins[row - 2]);

  const coin = coins[nextRow - 2];
  const curr = nextCol - 1;

  if (coin > curr) {
    styles[nextRow - 1][nextCol] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  } else {
    if (
      compared[nextRow - 1][nextCol - coin - 1] + 1 <
      compared[nextRow - 2][nextCol - 1]
    ) {
      styles[nextRow][nextCol - coin] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
    } else {
      styles[nextRow - 1][nextCol] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
    }
  }

  return {
    ...state,
    table,
    styles,
    steps,
    row: nextRow,
    col: nextCol
  };
};
