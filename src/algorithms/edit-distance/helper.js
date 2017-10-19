// @flow

import { createDPTable } from "utils/dp-helper";
import { longestString } from "utils/generic-helper";
import { createDpTable as comparedTable, createStyleTable } from "./algorithm";

import {
  DEFAULT_STYLE,
  ON_GOING_STYLE,
  INDICATE_STYLE
} from "./redux/constants";

const createStyles = (wordOne, wordTwo): Array<Array<string>> => {
  const result = createStyleTable(
    wordTwo,
    wordOne,
    DEFAULT_STYLE,
    ON_GOING_STYLE
  );
  result[1][0] = INDICATE_STYLE;
  result[0][1] = INDICATE_STYLE;
  return result;
};

export const createInitialState = (wordOne: string, wordTwo: string) => {
  const longerStr: string = longestString(wordOne, wordTwo);
  const buttons = () => Array.from(Array(longerStr.length + 1).keys());
  const style = createStyles(wordOne, wordTwo);
  return {
    table: createDPTable(wordOne, wordTwo),
    compared: comparedTable(wordOne, wordTwo),
    styles: style,
    buttons: buttons(),
    row: 1,
    col: 1,
    totalScore: longerStr.length,
    currentScore: longerStr.length,
    steps: 0
  };
};
