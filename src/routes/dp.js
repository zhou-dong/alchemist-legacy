import React from "react";

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
import LongestIncreasingSubsequence from "algorithms/longest-increasing-subsequence/";
import CoinChange from "algorithms/coin-change";
import LongestIncreasingSubsequenceII from "algorithms/longest-increasing-subsequence-ii";
import RegularExpression from "algorithms/regular-expression";
import WildcardMatching from "algorithms/wildcard-matching";
import RodCutting from "algorithms/rod-cutting";
import EggDroppingProblem from "algorithms/egg-dropping-problem";
import MinimumNumberOfJumpsToReachEnd from "algorithms/minimum-number-of-jumps-to-reach-end";

export default () => (
  <div>
    <EditDistance />
    <IsSubsequence />
    <LongestCommonSubsequence />
    <LongestCommonSubstring />
    <WordBreakI />
    <KnapsackProblem />
    <CoinChanging />
    <CoinChange />
    <MinimumPathSum />
    <MaximumSubarrayProblem />
    <SubsetSumProblem />
    <LongestPalindromicSubstring />
    <LongestPalindromicSubsequence />
    <PalindromePartitioning />
    <LongestIncreasingSubsequence />
    <LongestIncreasingSubsequenceII />
    <RegularExpression />
    <WildcardMatching />
    <RodCutting />
    <EggDroppingProblem />
    <MinimumNumberOfJumpsToReachEnd />
  </div>
);
