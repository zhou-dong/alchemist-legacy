const formula = `
<pre><code>if (front === end) {
    table[i][i + len - 1] = 2 +
        table[i + 1][i + len - 2];
} else {
    table[i][i + len - 1] = Math.max(
        table[i][i + len - 2],
        table[i + 1][i + len - 1]
    );
}
</code></pre>
`;

const introduction =
  "Given a string, find the longest palindromic subsequence's length";

const example = `<b>Example</b>
<pre><code>Example 1:
    Input: "abbab"
    Output: 4 // "abba"

Example 2:
    Input: "abdca"
    Output: 2 // "aa"
</code></pre>
`;
export const modalBody = `
<b>Introduction: </b>
</br>
${introduction}
</br>
${example}
<b>Formula: </b>
</br>
${formula}`;
