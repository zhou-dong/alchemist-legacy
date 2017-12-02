const formula = `
<pre><code>if (a === b) {
    table[row][col] = table[row - 1][col - 1] + 1
} else {
    table[row][col] = 0;
}
</code></pre>
`;

const introduction =
  "Given two strings ‘X’ and ‘Y’, find the length of the longest common substring.";

const example = `<b>Example:</b>
<pre><code>Input : X = "abcdxyz", y = "xyzabcd"
Output : 4
The longest common substring is "abcd" and is of length 4.

Input : X = "zxabcdezy", y = "yzabcdezx"
Output : 6
The longest common substring is "abcdez" and is of length 6.
</code></pre>`;

export const modalBody = `
<b>Introduction: </b>
</br>
${introduction}
</br>
${example}
<b>Formula: </b>
</br>
${formula}`;
