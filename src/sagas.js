import { all } from "redux-saga/effects";
import { watchGetUser } from "layout/saga";
import { watchGetEditDistanceCount } from "algorithms/edit-distance/redux/saga";
import { watchIsSubSequenceCount } from "algorithms/is-subsequence/redux/saga";
import { watchLongestCommonSubsequenceCount } from "algorithms/longest-common-subsequence/redux/saga";
import { watchLongestCommonSubstringCount } from "algorithms/longest-common-substring/redux/saga";
import { watchGetWordBreakOneCount } from "algorithms/word-break/1/redux/saga";
import { watchKnapsackProblemCount } from "algorithms/knapsack-problem/redux/saga";
import { watchCoinChangeFewestNumberCount } from "algorithms/coin-changing/redux/saga";
import { watchCoinChangeHowManyWaysCount } from "algorithms/coin-change/redux/saga";
import { watchMinimumPathSumCount } from "algorithms/minimum-path-sum/redux/saga";
import { watchMaximumSubarrayCount } from "algorithms/maximum-subarray-problem/redux/saga";
import { watchSubsetSumCount } from "algorithms/subset-sum-problem/redux/saga";
import { watchLongestPalindromicSubstringCount } from "algorithms/longest-palindromic-substring/redux/saga";

export default function* rootSaga() {
  yield all([
    watchGetUser(),
    watchGetEditDistanceCount(),
    watchIsSubSequenceCount(),
    watchLongestCommonSubsequenceCount(),
    watchLongestCommonSubstringCount(),
    watchGetWordBreakOneCount(),
    watchKnapsackProblemCount(),
    watchCoinChangeFewestNumberCount(),
    watchCoinChangeHowManyWaysCount(),
    watchMinimumPathSumCount(),
    watchMaximumSubarrayCount(),
    watchSubsetSumCount(),
    watchLongestPalindromicSubstringCount()
  ]);
}
