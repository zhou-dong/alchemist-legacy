const formula = `
<pre><code>if (!isPalindrome(row, col)) {
    let min = sequence.length;
    for (let k = row; k < col; k += 1) {
        min = Math.min(
            min,
            table[row][k]
                + table[k + 1][col]
        );
    }
    table[row][col] = min + 1;
} else {
    table[row][col] = 0;
}
</code></pre>
`;

const introduction =
  "Given a string s, partition s such that every substring of the partition is a palindrome. <br> Return the minimum cuts needed for a palindrome partitioning of s.";

const example = `<pre><code>Example:
    Input: "abbab"
    Output: 1 // "abba", "b"
</code></pre>`;

export const modalBody = `
<b>Introduction: </b>
</br>
${introduction}
</br>
<b>Example:<b>
${example}
<b>Formula: </b>
</br>
${formula}`;
