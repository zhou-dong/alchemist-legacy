import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_HELPER_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE
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
    styles[1][i] = TABLE_ELEMENT_INDICATE_STYLE;
    styles[i][0] = TABLE_ELEMENT_INDICATE_STYLE;
    styles[i][1] = TABLE_ELEMENT_INDICATE_STYLE;
  }
};

export default function(state, action) {
  const createNextRow = (row, col) => {
    return col + 1 === state.styles.length ? 2 : row + 1;
  };

  const createNextLen = len => {
    return col + 1 === state.styles.length ? len + 1 : len;
  };

  const createNextCol = (col, len) => {
    const nextCol = (col + 1) % state.styles.length;
    return nextCol < 2 ? 1 + len : nextCol;
  };

  if (isSuccess(state)) {
    return state;
  }

  const styles = clone2DArray(state.styles);
  const row = state.row;
  const col = state.col;
  const len = state.len;

  let nextRow = createNextRow(row, col);
  let nextLen = createNextLen(len);
  let nextCol = createNextCol(col, nextLen);

  reverseFirstRowAndColStyles(styles);
  updateIndicateStyles(styles, nextRow, nextLen);

  return { ...state, styles, row: nextRow, col: nextCol, len: nextLen };
}
