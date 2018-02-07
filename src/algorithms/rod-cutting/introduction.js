const formula = `
<pre><code>
if (col < len) {
    table[row][col] =
        table[row - 1][col];
} else {
    table[row][col] = Math.max(
        table[row - 1][col],
        price + table[row][col - len]
    );
}
</code></pre>
`;

const introduction =
  "Assume a company buys long steel rods and cuts them into shorter rods for sale to its customers. If each cut is free and rods of different lengths can be sold for different amounts, we wish to determine how to best cut the original rods to maximize the revenue. For example: ";

const example = `if length of the rod is 8 and the values of different pieces are given as following, then the maximum obtainable value is 22 (by cutting in two pieces of lengths 2 and 6).
<pre><code>
length   | 1   2   3   4   5   6   7   8
--------------------------------------------
price    | 1   5   8   9  10  17  17  20
</code></pre>
And if the prices are as following, then the maximum obtainable value is 24 (by cutting in eight pieces of length 1).
<pre><code>
length   | 1   2   3   4   5   6   7   8
--------------------------------------------
price    | 3   5   8   9  10  17  17  20
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
