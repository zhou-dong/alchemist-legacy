// @flow

import type { State, Action } from "./constants";
import {
  EDIT_DISTANCE_BUTTON_CLICK,
  CLOSE_MODAL_CLICK,
  OPEN_MODAL_CLICK,
  REFRESH_CLICK
} from "./constants";

import createInitialState from "../helper";

import {
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_SUCCESS_STYLE,
  TABLE_ELEMENT_ERROR_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE
} from "presentational/constants";

const isSuccess = (
  table: Array<Array<string | number>>,
  row: number,
  col: number
): boolean => {
  return row + 1 === table.length && col + 1 === table[row].length;
};

const isEndOfRow = (
  table: Array<Array<string | number>>,
  row: number,
  col: number
): boolean => {
  return col + 1 === table[row].length;
};

const inInitialCol = (row: number, col: number): boolean => {
  return row !== 1 && col === 1;
};

const updateSytles = (
  styles: Array<Array<string>>,
  row: number,
  col: number,
  nextRow: number,
  nextCol: number
): Array<Array<string>> => {
  styles[nextRow][nextCol] = TABLE_ELEMENT_ON_GOING_STYLE;
  // update col indicate style
  styles[0][col] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[0][nextCol] = TABLE_ELEMENT_INDICATE_STYLE;
  // update row indicate style
  styles[row][0] = TABLE_ELEMENT_DISABLE_STYLE;
  styles[nextRow][0] = TABLE_ELEMENT_INDICATE_STYLE;
  return styles;
};

const updateTable = (state: State, action: Action): State => {
  state.steps += 1;

  const table = state.table;
  const compared = state.compared;
  const styles = state.styles;
  const row = state.row;
  const col = state.col;
  let nextRow = row;
  let nextCol = col;

  table[row][col] = action.payload;

  if (compared[row - 1][col - 1] !== action.payload) {
    styles[row][col] = TABLE_ELEMENT_ERROR_STYLE;
    state.score = state.score === 0 ? 0 : state.score - 1;
    state.errors += 1;
    return { ...state, table, styles };
  }

  styles[row][col] = TABLE_ELEMENT_SUCCESS_STYLE;

  if (isSuccess(table, row, col)) {
    styles[row][col] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
    return { ...state, table: table, col: nextCol, row: nextRow, styles };
  }

  if (inInitialCol(row, col)) {
    if (row === table.length - 1) {
      nextRow = 2;
      nextCol = 2;
    } else {
      nextRow = row + 1;
    }
    updateSytles(styles, row, col, nextRow, nextCol);
    return { ...state, table: table, col: nextCol, row: nextRow, styles };
  }

  if (isEndOfRow(table, row, col)) {
    nextRow = row + 1;
    nextCol = row === 1 ? 1 : 2;
  } else {
    nextCol = col + 1;
  }

  updateSytles(styles, row, col, nextRow, nextCol);

  return { ...state, table: table, col: nextCol, row: nextRow, styles };
};

export default (state: State = createInitialState(), action: Action): State => {
  switch (action.type) {
    case EDIT_DISTANCE_BUTTON_CLICK:
      return updateTable(state, action);
    case CLOSE_MODAL_CLICK:
      return { ...state, showModal: false };
    case OPEN_MODAL_CLICK:
      return { ...state, showModal: true };
    case REFRESH_CLICK:
      return createInitialState();
    default:
      return state;
  }
};
