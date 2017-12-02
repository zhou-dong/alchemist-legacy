const formula = `
<pre><code>if (a === b) {
    table[row][col] =
        table[row - 1][col - 1] + 1
} else {
    table[row][col] = Math.max(
        table[row][col - 1],
        table[row - 1][col]
    )
}
</code></pre>
`;

const introduction =
  "Given two sequences, find the length of longest subsequence present in both of them. A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous. For example, “abc”, “abg”, “bdf”, “aeg”, ‘”acefg”, .. etc are subsequences of “abcdefg”.";

export const modalBody = `
<b>Introduction: </b>
</br>
${introduction}
</br>
<b>Formula: </b>
</br>
${formula}`;
