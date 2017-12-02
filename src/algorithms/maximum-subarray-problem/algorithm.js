/**
这个算法稍微有点难度的地方是计算最大区间的起始位置和结束位置。
首先结束位置容易计算，当每次更新最大值的时候，同时更新结束位置就行。
起始位置比较麻烦：
1. 首先定义一个 maybelaststart
2. 每次当 current > current + currentMaxs[index - 1];
  maybelaststart = index;
3. 每次更新最大值的时候，start = maybelaststart
 */
export default array => {
  const indexes = [];
  const currentMaxs = ["CURRENT_MAX", array[1]];
  const globalMaxs = ["GLOBAL_MAX", array[1]];
  const starts = ["START", 1];
  const ends = ["END", 1];

  let lastStart = 1;
  array.forEach((value, index) => {
    if (index < 2) return;
    let [currentMax, globalMax, end] = [0, 0, 0];
    let start = starts[index - 1];
    if (value > value + currentMaxs[index - 1]) {
      currentMax = value;
      lastStart = index;
    } else {
      currentMax = value + currentMaxs[index - 1];
    }
    if (currentMax > globalMaxs[index - 1]) {
      globalMax = currentMax;
      end = index;
      start = lastStart;
    } else {
      globalMax = globalMaxs[index - 1];
      end = ends[index - 1];
    }
    currentMaxs.push(currentMax);
    globalMaxs.push(globalMax);
    ends.push(end);
    starts.push(start);
  });

  return [indexes, array, currentMaxs, globalMaxs, starts, ends];
};
