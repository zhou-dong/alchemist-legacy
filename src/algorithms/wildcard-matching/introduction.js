const formula = `
<pre><code>if (p === "?" || p === t) {
    table[row][col] =
        table[row - 1][col - 1];
} else if (p === "*") {
    table[row][col] =
        table[row][col - 1] ||
        table[row - 1][col];
}
</code></pre>
`;

const introduction = `'?' Matches any single character. <br>
'*' Matches any sequence of characters (including the empty sequence). <br>
The matching should cover the entire input string (not partial).`;

const example = `
<pre><code>"aa","a" → false
"aa","aa" → true
"aa", "*" → true
"aa", "a*" → true
"ab", "?*" → true
"aab", "c*a*b" → false
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
