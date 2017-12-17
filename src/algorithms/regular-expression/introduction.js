const formula = `
<pre><code>const p = pattern.charAt(col - 1);
const prevP = pattern.charAt(col - 2);

if (p === "." || p === t) {
    table[row][col] =
        table[row - 1][col - 1];
} else if (p === "*") {
    if (table[row][col - 2] === true) {
        table[row][col] = true
    } else if (
        prevP === "." || prevP === t
    ) {
        table[row][col] =
            table[row - 1][col];
    }
}
</code></pre>
`;

const introduction = `'.' Matches any single character. <br>
'*' Matches zero or more of the preceding element. <br>
The matching should cover the entire input string (not partial).`;

const example = `
<pre><code>"aa","a" → false
"aa","aa" → true
"aa", "a*" → true
"aa", ".*" → true
"ab", ".*" → true
"aab", "c*a*b" → true
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
