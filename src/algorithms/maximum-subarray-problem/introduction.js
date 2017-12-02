const formula = `
<pre><code>
    def kadane(A):
        max_current = max_global = A[0]
        for val in A[1:]:
            max_current = max(val, val + max_current)
            max_global = max(max_current, max_global)
        return max_global
</code></pre>
`;

const introduction =
  "Finding the contiguous subarray within a one-dimensional array of numbers which has the largest sum. The list usually contains both positive and negative numbers. ";

export const modalBody = `
<b>Introduction: </b>
</br>
${introduction}
</br>
<b>Formula: </b>
</br>
${formula}`;
