const formula = `
<pre><code>if (sequence[row] > sequence[col - 1]) {
    table[row][col] = Math.max(
        table[row][col - 1],
        table[col - 1][col - 1] + 1
    );
} else {
    table[row][col] =
        table[row][col - 1];
}
</code></pre>
`;

const introduction =
  "Given an unsorted array of integers, find the length of longest increasing subsequence.";

const example = `
<pre><code>
Given [10, 9, 2, 5, 3, 7, 101, 18],
The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4.
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
