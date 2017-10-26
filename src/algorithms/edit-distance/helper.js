// @flow

import { createDPTable } from "utils/dp-helper";
import { longestString } from "utils/generic-helper";
import { createDpTable as comparedTable, createStyleTable } from "./algorithm";

import {
  DEFAULT_STYLE,
  ON_GOING_STYLE,
  INDICATE_STYLE,
  DISABLE_TABLE_BUTTON
} from "./redux/constants";

const createStyles = (wordOne, wordTwo): Array<Array<string>> => {
  const result = createStyleTable(
    wordTwo,
    wordOne,
    DEFAULT_STYLE,
    ON_GOING_STYLE,
    DISABLE_TABLE_BUTTON
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
    score: longerStr.length,
    steps: 0,
    errors: 0,
    showModal: false,
    modalTitle: "Edit Distance",
    title: "Edit Distance",
    modalBody:
      " <b>Use Case</b> find applications in natural language processing, where automatic spelling correction can determine candidate corrections for a misspelled word by selecting words from a dictionary that have a low distance to the word in question. <br><br> In bioinformatics, it can be used to quantify the similarity of DNA sequences, which can be viewed as strings of the letters A, C, G and T. <br><br> <b>Example</b> <br> The distance between kitten and sitting is 3. A minimal edit script that transforms the former into the latter is: <br> &nbsp;&nbsp; 1. kitten → sitten (substitution of 's' for 'k') <br> &nbsp;&nbsp; 2. sitten → sittin (substitution of 'i' for 'e') <br> &nbsp;&nbsp; 3. sittin → sitting (insertion of 'g' at the end). <br><br><b>Formula</b><br> if (str2.charAt(row - 1) === str1.charAt(col - 1)) { <br> &nbsp;&nbsp; table[row][col] = table[row - 1][col - 1];<br>} else {<br>&nbsp;&nbsp; const min: number = Math.min(<br>&nbsp;&nbsp; table[row - 1][col - 1],<br>&nbsp;&nbsp; table[row - 1][col],<br>&nbsp;&nbsp; table[row][col - 1] );<br>&nbsp;&nbsp; table[row][col] = min + 1;<br>}"
  };
};
