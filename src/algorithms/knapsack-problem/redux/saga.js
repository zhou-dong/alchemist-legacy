import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/6");
  yield put({
    type: "RECEIVED_KNAPSACK_PROBLEM_COUNT",
    record: response.data
  });
}

export function* watchKnapsackProblemCount() {
  yield take("GET_KNAPSACK_PROBLEM_COUNT");
  yield fork(getCount);
}
