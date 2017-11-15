import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_HELPER_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_ERROR_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE
} from "presentational/constants";

const isRowEnd = state => {
  return state.col === state.table[0].length - 1;
};

const isSuccess = state => {
  return state.row === 2 && isRowEnd(state);
};

const clone2DArray = array => {
  const cloned = [];
  array.forEach(row => {
    cloned.push(row.slice(0));
  });
  return cloned;
};

const reverseFirstRowAndColStyles = styles => {
  const updateHelperStyle = () => {
    styles.forEach(row => (row[1] = TABLE_ELEMENT_HELPER_STYLE));
    styles[1] = Array(styles[1].length).fill(TABLE_ELEMENT_HELPER_STYLE);
  };
  const updateDisableStyle = () => {
    styles.forEach(row => (row[0] = TABLE_ELEMENT_DISABLE_STYLE));
    styles[0] = Array(styles[0].length).fill(TABLE_ELEMENT_DISABLE_STYLE);
  };
  updateHelperStyle();
  updateDisableStyle();
  return styles;
};

const updateIndicateStyles = (styles, row, len) => {
  for (let i = row; i < row + len; i += 1) {
    styles[0][i] = TABLE_ELEMENT_INDICATE_STYLE;
    styles[1][i] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
    styles[i][0] = TABLE_ELEMENT_INDICATE_STYLE;
    styles[i][1] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  }
};

const nonCorrect = (comparedTable, row, col, payload) => {
  const value = payload === "TRUE" ? true : false;
  return comparedTable[row - 2][col - 2] !== value;
};

export default function(state, action) {
  const comparedTable = state.compared;
  const row = state.row;
  const col = state.col;
  const len = state.len;

  const table = clone2DArray(state.table);
  const styles = clone2DArray(state.styles);
  const steps = state.steps + 1;
  table[row][col] = action.payload === "TRUE" ? "T" : "F";

  if (nonCorrect(comparedTable, row, col, action.payload)) {
    styles[row][col] = TABLE_ELEMENT_ERROR_STYLE;
    return { ...state, table, styles, steps, errors: state.errors + 1 };
  }

  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;

  if (isSuccess(state)) {
    return { ...state, table, styles, steps };
  }

  const createNextCol = (col, len) => {
    const nextCol = (col + 1) % state.styles.length;
    return nextCol < 2 ? 1 + len : nextCol;
  };
  const nextRow = col + 1 === state.styles.length ? 2 : row + 1;
  const nextLen = col + 1 === state.styles.length ? len + 1 : len;
  const nextCol = createNextCol(col, nextLen);

  reverseFirstRowAndColStyles(styles);
  updateIndicateStyles(styles, nextRow, nextLen);
  styles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;

  return {
    ...state,
    table,
    styles,
    steps,
    row: nextRow,
    col: nextCol,
    len: nextLen
  };
}
