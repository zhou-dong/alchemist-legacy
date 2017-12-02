const formula = `
<pre><code>if (element > weight) {
    table[row][col] =
        table[row - 1][col]
} else {
    table[row][col] =
        table[row - 1][col] ||
        table[row - 1][weight - element]
}
</code></pre>
`;

const introduction =
  "Given a set of non-negative integers, and a value sum, determine if there is a subset of the given set with sum equal to given sum.";

const example = `<b>Examples</b>:
<pre><code>set = [3, 34, 4, 12, 5, 2], sum = 9
output: True

subset[4, 5] with sum 9
</code></pre>
`;

export const modalBody = `
<b>Introduction: </b>
</br>
${introduction}
</br>
${example}
<b>Formula: </b>
${formula}`;
