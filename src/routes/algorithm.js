import React from "react";
import { Route } from "react-router-dom";

import EditDistance from "algorithms/edit-distance";
import WordBreakI from "algorithms/word-break/1";
import KnapsackProblem from "algorithms/knapsack-problem";
import MinimumPathSum from "algorithms/minimum-path-sum";
import IsSubsequence from "algorithms/is-subsequence/";
import LongestCommonSubsequence from "algorithms/longest-common-subsequence";
import LongestCommonSubstring from "algorithms/longest-common-substring";
import CoinChanging from "algorithms/coin-changing";
import MaximumSubarrayProblem from "algorithms/maximum-subarray-problem";
import SubsetSumProblem from "algorithms/subset-sum-problem";
import LongestPalindromicSubsequence from "algorithms/longest-palindromic-subsequence";
import LongestPalindromicSubstring from "algorithms/longest-palindromic-substring";
import PalindromePartitioning from "algorithms/palindrome-partitioning";
import LongestIncreasingSubsequence from "algorithms/longest-increasing-subsequence";
import CoinChange from "algorithms/coin-change";
import LongestIncreasingSubsequenceII from "algorithms/longest-increasing-subsequence-ii";
import RegularExpression from "algorithms/regular-expression";
import WildcardMatching from "algorithms/wildcard-matching";
import RodCutting from "algorithms/rod-cutting";
import EggDroppingProblem from "algorithms/egg-dropping-problem";
import MinimumNumberOfJumpsToReachEnd from "algorithms/minimum-number-of-jumps-to-reach-end";
import MaxHeapWithSteps from "trees/max-heap/max-heap-with-steps-show";

const Algorithm = ({ match }) => {
  switch (match.params.name) {
    case "edit-distance":
      return <EditDistance />;
    case "word-break":
      return <WordBreakI />;
    case "knapsack-problem":
      return <KnapsackProblem />;
    case "minimum-path-sum":
      return <MinimumPathSum />;
    case "is-subsequence":
      return <IsSubsequence />;
    case "longest-common-subsequence":
      return <LongestCommonSubsequence />;
    case "longest-common-substring":
      return <LongestCommonSubstring />;
    case "coin-change":
      return <CoinChanging />;
    case "coin-change-2":
      return <CoinChange />;
    case "maximum-subarray":
      return <MaximumSubarrayProblem />;
    case "Kadane-algorithm":
      return <MaximumSubarrayProblem />;
    case "subset-sum-problem":
      return <SubsetSumProblem />;
    case "longest-palindromic-subsequence":
      return <LongestPalindromicSubsequence />;
    case "longest-palindromic-substring":
      return <LongestPalindromicSubstring />;
    case "palindrome-partitioning":
      return <PalindromePartitioning />;
    case "longest-increasing-subsequence":
      return (
        <div>
          <LongestIncreasingSubsequenceII />
          <LongestIncreasingSubsequence />
        </div>
      );
    case "regular-expression":
      return <RegularExpression />;
    case "wildcard-matching":
      return <WildcardMatching />;
    case "rod-cutting":
      return <RodCutting />;
    case "egg-dropping-problem":
      return <EggDroppingProblem />;
    case "minimum-jumps":
      return <MinimumNumberOfJumpsToReachEnd />;
    case "max-heap-shows":
      return <MaxHeapWithSteps />;
    default:
      return <h3>can not find algorithm: [{match.params.name}]</h3>;
  }
};

export default ({ match }) => (
  <Route path={`${match.url}/:name`} component={Algorithm} />
);
