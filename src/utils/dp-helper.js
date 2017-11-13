// @flow

import {
  TABLE_ELEMENT_DEFAULT_STYLE,
  TABLE_ELEMENT_ON_GOING_STYLE,
  TABLE_ELEMENT_DISABLE_STYLE,
  TABLE_ELEMENT_INDICATE_STYLE
} from "presentational/constants";

export const createDPTableWithoutIndicator = (
  str1: string,
  str2: string
): Array<Array<string | number>> => {
  const table: Array<Array<string | number>> = [];

  if (!str1 && !str2) {
    return table;
  }
  if (!str2) {
    str2 = str1.slice(0);
  }

  const createFirstRow = (): void => {
    table.push(["", ""].concat(str1.split("")));
  };

  const fillTableWithEmptyContent = (): void => {
    for (let i = 0; i <= str2.length; i += 1) {
      table.push(Array(str1.length + 2).fill(""));
    }
  };

  const insertFirstCol = (): void => {
    str2.split("").forEach((ch, i) => (table[i + 2][0] = ch));
  };

  createFirstRow();
  fillTableWithEmptyContent();
  insertFirstCol();
  return table;
};

export const createDPTableWithIndicator = (
  str1: string,
  str2: string
): Array<Array<string | number>> => {
  const table: Array<Array<string | number>> = createDPTableWithoutIndicator(
    str1,
    str2
  );

  if (!table || table.length < 1) {
    return table;
  }

  const fillSecondRow = (): void => {
    for (let col = 2; col < table[1].length; col += 1) {
      table[1][col] = col - 2;
    }
  };

  const fillSecondCol = (): void => {
    for (let row = 2; row < table.length; row += 1) {
      table[row][1] = row - 2;
    }
  };

  fillSecondRow();
  fillSecondCol();
  return table;
};

const createStyleTable = (str1: string, str2: string): Array<Array<string>> => {
  const table: Array<Array<string>> = [];

  if (!str1 && !str2) {
    return table;
  }
  if (!str2) {
    str2 = str1.slice(0);
  }

  const rowLength = str2.length + 2;
  const colLength = str1.length + 2;

  const fillTableWithDefaultStyle = (): void => {
    for (let row = 0; row < rowLength; row += 1) {
      table.push(Array(colLength).fill(TABLE_ELEMENT_DEFAULT_STYLE));
    }
  };

  const updateFirstRowWithDisableStyle = (): void => {
    if (table.length === 0) {
      return;
    }
    for (let col = 0; col < table[0].length; col += 1) {
      table[0][col] = TABLE_ELEMENT_DISABLE_STYLE;
    }
  };

  const updateFirstColWithDisableStyle = (): void => {
    for (let row = 0; row < table.length; row += 1) {
      table[row][0] = TABLE_ELEMENT_DISABLE_STYLE;
    }
  };

  fillTableWithDefaultStyle();
  updateFirstRowWithDisableStyle();
  updateFirstColWithDisableStyle();
  return table;
};

export const createStyleTableWithoutIndicator = (
  str1: string,
  str2: string
): Array<Array<string>> => {
  const table: Array<Array<string>> = createStyleTable(str1, str2);

  const setupFirstOpearteTableElement = (): void => {
    if (table.length > 0 && table[0].length > 0) {
      table[1][1] = TABLE_ELEMENT_ON_GOING_STYLE;
    }
  };

  const setupFirstIndicate = (): void => {
    table[1][0] = TABLE_ELEMENT_INDICATE_STYLE;
    table[0][1] = TABLE_ELEMENT_INDICATE_STYLE;
  };

  setupFirstOpearteTableElement();
  setupFirstIndicate();
  return table;
};

export const createStyleTableWithIndicator = (
  str1: string,
  str2: string
): Array<Array<string>> => {
  const table: Array<Array<string>> = createStyleTable(str1, str2);

  const updateSecondRowWithDisableStyle = (): void => {
    if (table.length < 2) {
      return;
    }
    for (let col = 0; col < table[0].length; col += 1) {
      table[1][col] = TABLE_ELEMENT_DISABLE_STYLE;
    }
  };

  const updateSecondColWithDisableStyle = (): void => {
    for (let row = 2; row < table.length; row += 1) {
      if (table[row].length > 1) {
        table[row][1] = TABLE_ELEMENT_DISABLE_STYLE;
      }
    }
  };

  const setupFirstOpearteTableElement = (): void => {
    if (table.length > 1 && table[1].length > 0) {
      table[2][2] = TABLE_ELEMENT_ON_GOING_STYLE;
    }
  };

  const setupFirstIndicate = (): void => {
    table[2][0] = TABLE_ELEMENT_INDICATE_STYLE;
    table[0][2] = TABLE_ELEMENT_INDICATE_STYLE;
  };

  updateSecondRowWithDisableStyle();
  updateSecondColWithDisableStyle();
  setupFirstOpearteTableElement();
  setupFirstIndicate();
  return table;
};
