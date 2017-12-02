import createComparedTable from "./algorithm";
import { modalBody } from "./introduction";

import {
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE,
  TABLE_ELEMENT_SUB_INDICATE_STYLE
} from "presentational/constants";

const random = max => Math.floor(Math.random() * max);
const randomInclude = max => random(max) + 1;
const randomInt = max =>
  random(2) === 1 ? randomInclude(max) : 0 - randomInclude(max);
const concatEmpty = (array, size) => array.concat(Array(size).fill(""));

const createButtons = table => {
  const result = [];
  table[2]
    .slice(1)
    .concat(table[3].slice(1))
    .forEach(value => {
      if (!result.includes(value)) result.push(value);
    });
  return result;
};

const createDisplayTable = (size, max) => {
  const indexes = ["INDEX"].concat(Array.from(Array(size).keys()));
  const values = ["VALUE"].concat(
    Array(size)
      .fill(max)
      .map(num => randomInt(num))
  );
  const currentMax = concatEmpty(["CUR_MAX"], size);
  const globalMax = concatEmpty(["GLO_MAX"], size);
  return [indexes, values, currentMax, globalMax];
};

const createStyleTable = size => {
  const indexes = Array(size + 1).fill(TABLE_ELEMENT_DISABLE_STYLE);
  indexes[0] = TABLE_ELEMENT_DISABLE_STYLE;
  indexes[1] = TABLE_ELEMENT_SUB_INDICATE_STYLE;
  const values = Array(size + 1).fill(TABLE_ELEMENT_DISABLE_STYLE);
  values[1] = TABLE_ELEMENT_INDICATE_STYLE;
  const currentMaxs = concatEmpty([TABLE_ELEMENT_DISABLE_STYLE], size);
  const globalMaxs = concatEmpty([TABLE_ELEMENT_DISABLE_STYLE], size);
  return [indexes, values, currentMaxs, globalMaxs];
};

export default () => {
  const size = 7;
  const max = 15;
  const table = createDisplayTable(size, max);
  const compared = createComparedTable(table[1]);
  return {
    table: table,
    styles: createStyleTable(size),
    compared: compared,
    score: size,
    buttons: createButtons(compared),
    title: "Maximum Subarray Problem Kadane's algorithm",
    modalTitle: "Maximum Subarray Problem (Kadane's algorithm)",
    modalBody: modalBody,
    steps: 0,
    errors: 0,
    showModal: false,
    row: 2,
    col: 1,
    start: 1,
    end: 1,
    max: 0,
    currMax: 0
  };
};
