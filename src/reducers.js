import { combineReducers } from "redux";

import editDistanceReducer from "algorithms/edit-distance/redux/reducer";
import wordBreadIReducer from "algorithms/word-break/1/redux/reducer";
import knapsackProblemReducer from "algorithms/knapsack-problem/redux/reducer";
import minimumPathSumReducer from "algorithms/minimum-path-sum/redux/reducer";
import isSubsequenceReducer from "algorithms/is-subsequence/redux/reducer";
import longestCommonSubsequenceReducer from "algorithms/longest-common-subsequence/redux/reducer";
import longestCommonSubstringReducer from "algorithms/longest-common-substring/redux/reducer";
import coinChangingReducer from "algorithms/coin-changing/redux/reducer";
import coinChangeReducer from "algorithms/coin-change/redux/reducer";
import maximumSubarrayProblemReducer from "algorithms/maximum-subarray-problem/redux/reducer";
import subsetSumProblemReducer from "algorithms/subset-sum-problem/redux/reducer";
import longestPalindromicSubsequenceReducer from "algorithms/longest-palindromic-subsequence/redux/reducer";
import longestPalindromicSubstringReducer from "algorithms/longest-palindromic-substring/redux/reducer";
import palindromePartitioningReducer from "algorithms/palindrome-partitioning/redux/reducer";
import longestIncreasingSubsequenceReducer from "algorithms/longest-increasing-subsequence/redux/reducer";
import longestIncreasingSubsequenceIiReducer from "algorithms/longest-increasing-subsequence-ii/redux/reducer";
import regularExpressionReducer from "algorithms/regular-expression/redux/reducer";
import wildcardMatchingReducer from "algorithms/wildcard-matching/redux/reducer";

export default combineReducers({
  editDistanceReducer,
  wordBreadIReducer,
  knapsackProblemReducer,
  minimumPathSumReducer,
  isSubsequenceReducer,
  longestCommonSubsequenceReducer,
  longestCommonSubstringReducer,
  coinChangingReducer,
  maximumSubarrayProblemReducer,
  subsetSumProblemReducer,
  longestPalindromicSubsequenceReducer,
  longestPalindromicSubstringReducer,
  palindromePartitioningReducer,
  longestIncreasingSubsequenceReducer,
  coinChangeReducer,
  longestIncreasingSubsequenceIiReducer,
  regularExpressionReducer,
  wildcardMatchingReducer
});
