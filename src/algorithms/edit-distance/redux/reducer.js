// @flow

import type { State, Action } from "./constants";
import { EDIT_DISTANCE_BUTTON_CLICK } from "./constants";
import { createInitialState } from '../helper';
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

const updateTable = (state: State, action: Action): State => {
  state.steps += 1;

  const table = state.table;
  const compared = state.compared;
  const styles = state.styles;
  const row = state.row;
  const col = state.col;

  if (compared[row - 1][col - 1] === action.value) {
    table[row][col] = action.value;
    styles[row][col] = SUCCESS_STYLE;

    if (!isSuccess(table, row, col)) {
      if (isEndOfRow(table, row, col)) {
        const nextRow = row + 1;
        const nextCol = 1;

        styles[nextRow][nextCol] = ON_GOING_STYLE;

        // update row indicate style
        styles[row][0] = DEFAULT_STYLE;
        styles[nextRow][0] = INDICATE_STYLE;

        // update col indicate style
        styles[0][col] = DEFAULT_STYLE;
        styles[0][1] = INDICATE_STYLE;

        return { ...state, table: table, row: nextRow, col: nextCol, styles };
      } else {
        const nextCol = col + 1;
        styles[row][nextCol] = ON_GOING_STYLE;

        // update col indicate style
        styles[0][col] = DEFAULT_STYLE;
        styles[0][nextCol] = INDICATE_STYLE;

        return { ...state, table: table, col: nextCol, styles };
      }
    } else {
      console.log("success");
      return { ...state, table: table };
    }
  } else {
    styles[row][col] = ERROR_STYLE;
    state.currentScore -= 1;
    return { ...state, table, styles };
  }
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
