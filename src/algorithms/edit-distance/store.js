import registerServiceWorker from "./registerServiceWorker";
import EditDistance from "algorithms/edit-distance";

import { createDPTable } from "utils/dp-helper";
import { longestString } from "utils/generic-helper";
import {
  createDpTable as comparedTable,
  createStyleTable
} from "algorithms/edit-distance/algorithm";

const wordOne = "abcde";
const wordTwo = "abgfe";

const longerStr: string = longestString(wordOne, wordTwo);

const buttons = () => {
  const longer: string = longerStr;
  return Array.from(Array(longer.length + 1).keys());
};

const styles: Array<Array<string>> = createStyleTable(
  wordOne,
  wordTwo,
  DEFAULT_STYLE,
  ON_GOING_STYLE
);
styles[1][0] = INDICATE_STYLE;
styles[0][1] = INDICATE_STYLE;

const initialState = {
  table: createDPTable(wordOne, wordTwo),
  compared: comparedTable(wordOne, wordTwo),
  styles: styles,
  buttons: buttons(),
  row: 1,
  col: 1,
  totalScore: longerStr.length,
  currentScore: longerStr.length,
  steps: 0
};
