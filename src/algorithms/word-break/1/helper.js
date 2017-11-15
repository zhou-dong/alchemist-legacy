import {
  createDPTableWithIndicator,
  createStyleTableWithIndicator
} from "utils/dp-helper";

import createComparedTable from "./algorithm";

const equation = `
<pre><code>for (let len = 1; len <= str.length; len += 1) {
  for (
    let start = 0, end = start + len - 1;
    end < str.length;
    start += 1, end += 1
  ) {
    const sub = str.substring(start, end + 1);
    if (dict.includes(sub)) {
      table[start][end] = true;
      continue;
    }
    for (let i = start; i < end; i += 1) {
      if (table[start][i] && table[i + 1][end]) {
        table[start][end] = true;
        break;
      }
    }
  }
}</code></pre>
`;

const modalBody =
  "<b>Introduction: </b></br>Given an input string and a dictionary of words, find out if the input string can be segmented into a space-separated sequence of dictionary words. </br></br><b> Equation: </b></br>" +
  equation;

export const createInitialState = (word, dictionary) => ({
  table: createDPTableWithIndicator(word),
  styles: createStyleTableWithIndicator(word),
  compared: createComparedTable(word, dictionary),
  score: word.length,
  steps: 0,
  errors: 0,
  buttons: ["TRUE", "FALSE"],
  title: "Word Break I",
  modalTitle: "Word Break I",
  modalBody: modalBody,
  showModal: false,
  dictionary: ["Dictionary :"].concat(dictionary),
  row: 2,
  col: 2,
  len: 1
});
