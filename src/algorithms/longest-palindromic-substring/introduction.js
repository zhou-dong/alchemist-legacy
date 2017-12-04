const formula = `
<pre><code>if (front === end) {
    table[i][i + len - 1] =
        table[i + 1][i + len - 2];
} else {
    table[i][i + len - 1] = false;
}
</code></pre>
`;

const introduction =
  "Given a string, find the length of longest palindromic substring.";

const example = `<b>Example:</b>
<pre><code>Example:
Input: "dbcdcd"
Output: 3
Note: "cdc", "dcd" with length 3
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
