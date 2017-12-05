const initTable = (sequence, value) => {
  const table = [];
  for (let i = 0; i < sequence.length; i += 1) {
    table.push(Array(sequence.length).fill(value));
  }
  return table;
};

const palindrome = sequence => {
  const table = initTable(sequence, false);
  for (let i = 0; i < table.length; i += 1) {
    table[i][i] = true;
  }
  for (let i = 0; i < table.length - 1; i += 1) {
    if (sequence.charAt(i) === sequence.charAt(i + 1)) {
      table[i][i + 1] = true;
    }
  }
  for (let len = 3; len <= table.length; len += 1) {
    for (let i = 0; i + len <= table.length; i += 1) {
      const front = sequence.charAt(i);
      const end = sequence.charAt(i + len - 1);
      if (front === end) {
        table[i][i + len - 1] = table[i + 1][i + len - 2];
      }
    }
  }
  return table;
};

const partitioning = (sequence, palindromeTable) => {
  const table = initTable(sequence, 0);
  const isPalindrome = (row, col) => palindromeTable[row][col];
  for (let i = 0; i < table.length; i += 1) {
    table[i][i] = 0;
  }
  for (let i = 0; i < table.length - 1; i += 1) {
    if (sequence.charAt(i) !== sequence.charAt(i + 1)) {
      table[i][i + 1] = 1;
    }
  }
  for (let len = 3; len <= table.length; len += 1) {
    for (let row = 0; row + len <= table.length; row += 1) {
      const col = row + len - 1;
      if (!isPalindrome(row, col)) {
        let min = sequence.length;
        for (let k = row; k < col; k += 1) {
          min = Math.min(min, table[row][k] + table[k + 1][col]);
        }
        table[row][col] = min + 1;
      }
    }
  }
  return table;
};

export default sequence => {
  const palindromeTable = palindrome(sequence);
  return {
    palindrome: palindromeTable,
    partitioning: partitioning(sequence, palindromeTable)
  };
};
