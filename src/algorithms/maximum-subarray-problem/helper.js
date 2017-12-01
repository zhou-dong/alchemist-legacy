import {
  createDPTableWithIndicator,
  createStyleTableWithIndicator
} from "utils/dp-helper";

import mock from "./__mock__/maximum-subarray-problem-mock.json";
import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";

import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_HELPER_STYLE
} from "presentational/constants";

const random = max => Math.floor(Math.random() * max);
const randomInclude = max => random(max) + 1;
const randomInt = max =>
  random(2) == 1 ? randomInclude(max) : 0 - randomInclude(max);
const concatEmpty = (array, size) => array.concat(Array(size).fill(""));

const createButtons = (size, max) => {};

const createDisplayTable = (size, max) => {
  const values = ["VALUE"].concat(
    Array(size)
      .fill(max)
      .map(num => randomInt(num))
  );
  const currentMax = concatEmpty(["CUR_MAX"], size);
  const globalMax = concatEmpty(["GLO_MAX"], size);
  return [values, currentMax, globalMax];
};

const createStyleTable = size => {
  const first = Array(size + 1).fill(TABLE_ELEMENT_DISABLE_STYLE);
  const second = concatEmpty([TABLE_ELEMENT_HELPER_STYLE], size);
  const third = concatEmpty([TABLE_ELEMENT_HELPER_STYLE], size);
  return [first, second, third];
};

export default () => {
  const size = 7;
  const max = 15;
  const table = createDisplayTable(size, max);
  return {
    table: table,
    styles: createStyleTable(size),
    compared: createComparedTable(table[0]),
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
