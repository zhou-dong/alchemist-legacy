import {
  createDPTableWithoutIndicator,
  createStyleTableWithoutIndicator
} from "utils/dp-helper";
import { longestString } from "utils/generic-helper";
import { createDpTable as comparedTable } from "./algorithm";
import mock from "./__mock__/edit-distance-mock";

const formula = `<b>Formula</b>
<pre><code>if (char1 === char2) {
    table[row][col] =
        table[row - 1][col - 1]
} else {
    table[row][col] = 1 + Min(
        table[row - 1][col - 1],
        table[row - 1][col],
        table[row][col - 1]
    )
}
</code></pre>
`;

const modalBody =
  " <b>Use Case</b><br>1. Find applications in natural language processing, where automatic spelling correction can determine candidate corrections for a misspelled word by selecting words from a dictionary that have a low distance to the word in question. <br><br>2. In bioinformatics, it can be used to quantify the similarity of DNA sequences, which can be viewed as strings of the letters A, C, G and T. <br><br> <b>Example</b> <br> The distance between kitten and sitting is 3. A minimal edit script that transforms the former into the latter is: <br> &nbsp;&nbsp; 1. kitten → sitten (substitution of 's' for 'k') <br> &nbsp;&nbsp; 2. sitten → sittin (substitution of 'i' for 'e') <br> &nbsp;&nbsp; 3. sittin → sitting (insertion of 'g' at the end). <br><br>" +
  formula;

export default state => {
  const data = mock();
  const wordOne = data.word1;
  const wordTwo = data.word2;
  const longerStr: string = longestString(wordOne, wordTwo);
  const count = (state && state.count) || 0;
  return {
    table: createDPTableWithoutIndicator(wordOne, wordTwo),
    compared: comparedTable(wordOne, wordTwo),
    styles: createStyleTableWithoutIndicator(wordOne, wordTwo),
    buttons: Array.from(Array(longerStr.length + 1).keys()),
    row: 1,
    col: 1,
    score: longerStr.length,
    steps: 0,
    errors: 0,
    showModal: false,
    modalTitle: "Edit Distance",
    title: "Edit Distance",
    modalBody: modalBody,
    count: count,
    id: 1,
    success: false
  };
};
