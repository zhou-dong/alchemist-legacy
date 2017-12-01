import {
  createDPTableWithIndicator,
  createStyleTableWithIndicator
} from "utils/dp-helper";

import mock from "./__mock__/maximum-subarray-problem-mock.json";
import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";

import { TABLE_ELEMENT_DISABLE_STYLE } from "presentational/constants";

const random = max => Math.floor(Math.random() * max);
const randomInclude = max => random(max) + 1;
const randomNegativePostive = max =>
  random(2) == 1 ? randomInclude(max) : 0 - randomInclude(max);

const createButtons = (size, max) => {};

const createDisplayTable = (size, max) => {
  const first = Array(size)
    .fill(max)
    .map(num => randomNegativePostive(num));
  const second = Array(size).fill("");
  return [first, second];
};

const createStyleTable = size => {
  const first = Array(size).fill(TABLE_ELEMENT_DISABLE_STYLE);
  const second = Array(size).fill("");
  return [first, second];
};

export default () => {
  const size = 8;
  const max = 15;
  const table = createDisplayTable(size, max);
  return {
    table: table,
    styles: createStyleTable(size),
    compared: createComparedTable(table),
    score: size,
    buttons: createButtons(),
    title: "Maximum Subarray Problem Kadane's algorithm",
    modalTitle: "Maximum Subarray Problem",
    modalBody: modalBody,
    steps: 0,
    errors: 0,
    showModal: false,
    start: 0,
    end: 0,
    max: 0,
    currMax: 0
  };
};
