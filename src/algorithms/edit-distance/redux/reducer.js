// @flow

import type { State, Action } from "./constants";
import { EDIT_DISTANCE_BUTTON_CLICK } from "./constants";
import { createInitialState } from "../helper";
import getData from "utils/data";

import {
  DEFAULT_STYLE,
  ON_GOING_STYLE,
  SUCCESS_STYLE,
  ERROR_STYLE,
  INDICATE_STYLE
} from "./constants";

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
  styles[nextRow][nextCol] = ON_GOING_STYLE;
  // update col indicate style
  styles[0][col] = DEFAULT_STYLE;
  styles[0][nextCol] = INDICATE_STYLE;
  // update row indicate style
  styles[row][0] = DEFAULT_STYLE;
  styles[nextRow][0] = INDICATE_STYLE;
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

  if (compared[row - 1][col - 1] !== action.value) {
    styles[row][col] = ERROR_STYLE;
    state.score = state.score === 0 ? 0 : state.score - 1;
    state.errors += 1;
    return { ...state, table, styles };
  }

  table[row][col] = action.value;
  styles[row][col] = SUCCESS_STYLE;

  if (isSuccess(table, row, col)) {
    console.log("success");
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

const pair = getData();
const initialState = createInitialState(pair.word1, pair.word2);

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case EDIT_DISTANCE_BUTTON_CLICK:
      return updateTable(state, action);
    default:
      return state;
  }
};
