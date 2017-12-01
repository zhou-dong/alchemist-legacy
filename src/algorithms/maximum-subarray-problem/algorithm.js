const execute = nums => {
  const currentMaxs = [nums[0]];
  const globalMaxs = [nums[0]];
  const starts = [0];
  const ends = [0];

  nums.forEach((value, index) => {
    if (index === 0) return;
    let currentMax = 0;
    let globalMax = 0;
    let start = starts[index - 1];
    let end = 0;
    if (value > value + currentMaxs[index - 1]) {
      currentMax = value;
      if (value > globalMaxs[index - 1]) {
        start = index;
      }
    } else {
      currentMax = value + currentMaxs[index - 1];
    }
    if (currentMax >= globalMaxs[index - 1]) {
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
  return [nums, currentMaxs, globalMaxs, starts, ends];
};

export default array => execute(array.slice(1));
