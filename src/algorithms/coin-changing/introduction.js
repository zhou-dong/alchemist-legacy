const formula = `
<pre><code>if (coin > col) {
    table[row][col] =
        table[row - 1][col]
} else {
    table[row][col] = Min(
        table[row][col - coin] + 1,
        table[row - 1][col]
    )
}
</code></pre>
`;

const introduction =
  "You are given coins of different denominations and a total amount of money amount. Find the fewest number of coins that you need to make up that amount. </br> If that amount of money cannot be made up by any combination of the coins, return -1.";

export const modalBody = `
<b>Introduction: </b>
</br>
${introduction}
</br>
<b>Formula: </b>
</br>
${formula}`;
