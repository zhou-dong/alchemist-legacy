// @flow

import { createDPTable } from "../../../utils/dp-helper";
import type { State, Action } from "./constants";
import { EDIT_DISTANCE_BUTTON_CLICK } from "./constants";
import { longestString } from "../../../utils/generic-helper";
import { createDpTable as comparedTable, createStyleTable } from "../algorithm";

import {
  defaultStyle,
  goingStyle,
  successStyle,
  errorStyle
} from "./constants";

const wordOne = "abcde";
const wordTwo = "abgfe";

const buttons = () => {
  const longer: string = longestString(wordOne, wordTwo);
  return Array.from(Array(longer.length + 1).keys());
};

const initialState = {
  table: createDPTable(wordOne, wordTwo),
  compared: comparedTable(wordOne, wordTwo),
  styles: createStyleTable(wordOne, wordTwo, defaultStyle, goingStyle),
  buttons: buttons(),
  row: 1,
  col: 1
};

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
  const table = state.table;
  const compared = state.compared;
  const styles = state.styles;
  const row = state.row;
  const col = state.col;

  if (compared[row - 1][col - 1] === action.value) {
    table[row][col] = action.value;
    styles[row][col] = successStyle;

    if (!isSuccess(table, row, col)) {
      if (isEndOfRow(table, row, col)) {
        const nextRow = row + 1;
        const nextCol = 1;
        styles[nextRow][nextCol] = goingStyle;
        return { ...state, table: table, row: nextRow, col: nextCol, styles };
      } else {
        const nextCol = col + 1;
        styles[row][nextCol] = goingStyle;
        return { ...state, table: table, col: nextCol, styles };
      }
    } else {
      console.log("success");
      return { ...state, table: table };
    }
  } else {
    styles[row][col] = errorStyle;
    return { ...state, table, styles };
  }

};

export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    case EDIT_DISTANCE_BUTTON_CLICK:
      return updateTable(state, action);
    default:
      return state;
  }
}
