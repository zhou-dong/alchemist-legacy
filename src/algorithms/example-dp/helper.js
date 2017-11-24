import {
  createDPTableWithIndicator,
  createStyleTableWithIndicator
} from "utils/dp-helper";

import mock from "./__mock__/example-dp-mock.json";
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
    title: "Example Dp",
    modalTitle: "Example Dp",
    modalBody: modalBody,
    row: getStartRowIndex(),
    col: getStartColIndex(),
    steps: 0,
    errors: 0,
    showModal: false
  };
};
