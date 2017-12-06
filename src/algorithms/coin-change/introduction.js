const formula = `
<pre><code>if (coin > col) {
    table[row][col] =
        table[row - 1][col];
} else {
    table[row][col] =
        table[row][col - coin] +
        table[row - 1][col];
}
</code></pre>
`;

const introduction =
  "You have some types of coins available in infinite quantities where the value of each coin is given in the array. Can you determine the number of ways of making change for units using the given types of coins?";

export const modalBody = `
<b>Introduction: </b>
</br>
${introduction}
</br>
<b>Formula: </b>
</br>
${formula}`;
