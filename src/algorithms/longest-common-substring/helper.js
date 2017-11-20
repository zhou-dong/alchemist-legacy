import {
  createDPTableWithIndicator,
  createStyleTableWithIndicator
} from "utils/dp-helper";

import mock from "./__mock__/longest-common-substring-mock.json";
import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";

const createButtons = () => {};

const createDisplayTable = () => {};

const createStyleTable = () => {};

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
    title: "Longest Common Substring",
    modalTitle: "Longest Common Substring",
    modalBody: modalBody,
    row: getStartRowIndex(),
    col: getStartColIndex(),
    steps: 0,
    errors: 0,
    showModal: false
  };
};
