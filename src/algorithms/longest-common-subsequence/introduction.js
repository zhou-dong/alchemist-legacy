const formula = `
<pre><code>if (a === b) {
    table[row][col] = table[row - 1][col - 1] + 1;
} else {
    table[row][col] = Math.max(table[row][col - 1], table[row - 1][col]);
}
</code></pre>
`;

const introduction = "... introduction ...";

export const modalBody = `
<b>Introduction: </b>
</br>
${introduction}
</br>
<b>Formula: </b>
</br>
${formula}`;
