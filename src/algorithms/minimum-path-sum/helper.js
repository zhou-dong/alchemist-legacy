import {
  createDPTableWithIndicator,
  createStyleTableWithIndicator
} from "utils/dp-helper";

import mock from "./__mock__/minimum-path-sum-mock.json";
import createComparedTable from "./algorithm";

const equation = `
<pre><code>
  ... code ...
</code></pre>
`;

const introduction = "... introduction ...";
const modalBody = `
<b>Introduction: </b>
</br>
${introduction}
</br>
<b>Equation: </b>
</br>
${equation}`;

const createButtons = () => {};

const createDisplayTable = () => {};

const createStyleTable = () => {};

const createComparedTable = () => {};

const getTotalScore = () => {};

const getStartRowIndex = () => {};

const getStartColIndex = () => {};

export default () => {
  return {
    table: createDisplayTable(),
    styles: createStyleTable(),
    compared: createComparedTable(),
    score: getTotalScore(),
    buttons: createButtons(),
    title: "Minimum Path Sum",
    modalTitle: "Minimum Path Sum",
    modalBody: modalBody,
    row: getStartRowIndex(),
    col: getStartColIndex(),
    steps: 0,
    errors: 0,
    showModal: false
  };
};
