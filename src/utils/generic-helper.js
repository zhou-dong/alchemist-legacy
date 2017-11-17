// @flow

export const longestString = (...args: string[]) => {
  return args.reduce((a, b) => (a.length > b.length ? a : b));
};

export const clone2DArray = (array: Array<any>): Array<any> => {
  const cloned = [];
  array.forEach(row => {
    cloned.push(row.slice(0));
  });
  return cloned;
};

export const arrayShuffle = (array: Array<any>): Array<any> => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    swap(array, i, j);
  }
  return array;
};

export const stringShuffle = (str: string): string => {
  return arrayShuffle(str.split("")).join("");
};

const swap = (array: Array<any>, i: number, j: number) => {
  //[array[i], array[j]] = [array[j], array[i]];
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};
