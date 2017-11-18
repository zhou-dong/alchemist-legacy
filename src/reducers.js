import { combineReducers } from "redux";

import editDistanceReducer from "algorithms/edit-distance/redux/reducer";
import wordBreadIReducer from "algorithms/word-break/1/redux/reducer";
import knapsackProblemReducer from "algorithms/knapsack-problem/redux/reducer";
import minimumPathSumReducer from "algorithms/minimum-path-sum/redux/reducer";
export default combineReducers({
  editDistanceReducer,
  wordBreadIReducer,
  knapsackProblemReducer,
  minimumPathSumReducer
});
