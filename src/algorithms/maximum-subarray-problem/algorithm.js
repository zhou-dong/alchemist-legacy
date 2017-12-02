export default array => {
  const indexes = [];
  const currentMaxs = ["CURRENT_MAX", array[1]];
  const globalMaxs = ["GLOBAL_MAX", array[1]];
  const starts = ["START", 1];
  const ends = ["END", 1];

  array.forEach((value, index) => {
    if (index < 2) return;
    let [currentMax, globalMax, end] = [0, 0, 0];
    let start = starts[index - 1];
    if (value > value + currentMaxs[index - 1]) {
      currentMax = value;
      if (value > globalMaxs[index - 1]) {
        start = index;
      }
    } else {
      currentMax = value + currentMaxs[index - 1];
    }
    if (currentMax > globalMaxs[index - 1]) {
      globalMax = currentMax;
      end = index;
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
