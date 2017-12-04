const initTable = (sequence, value) => {
  const table = [];
  for (let i = 0; i < sequence.length; i += 1) {
    table.push(Array(sequence.length).fill(value));
  }
  return table;
};

const truthTable = sequence => {
  const table = initTable(sequence, false);
  for (let i = 0; i < table.length; i += 1) {
    table[i][i] = true;
  }
  for (let i = 0; i < table.length - 1; i += 1) {
    if (sequence.charAt(i) === sequence.charAt(i + 1)) {
      table[i][i + 1] = true;
    } else {
      table[i][i + 1] = false;
    }
  }
  for (let len = 3; len <= table.length; len += 1) {
    for (let i = 0; i + len <= table.length; i += 1) {
      const front = sequence.charAt(i);
      const end = sequence.charAt(i + len - 1);
      if (front === end) {
        table[i][i + len - 1] = table[i + 1][i + len - 2];
      } else {
        table[i][i + len - 1] = false;
      }
    }
  }
  return table;
};

const marksTable = (sequence, truth) => {
  let max = 1;
  const table = initTable(sequence, 1);
  for (let i = 0; i < table.length - 1; i += 1) {
    if (sequence.charAt(i) === sequence.charAt(i + 1)) {
      max = 2;
    }
    table[i][i + 1] = max;
  }
  for (let len = 3; len <= table.length; len += 1) {
    for (let i = 0; i + len <= table.length; i += 1) {
      const front = sequence.charAt(i);
      const end = sequence.charAt(i + len - 1);
      if (front === end && truth[i][i + len - 1]) {
        max = Math.max(max, 2 + table[i + 1][i + len - 2]);
      }
      table[i][i + len - 1] = max;
    }
  }
  return table;
};

export default sequence => {
  const truth = truthTable(sequence);
  const marks = marksTable(sequence, truth);
  return { truth: truth, marks: marks };
};
