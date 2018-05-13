import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/15");
  yield put({
    type: "RECEIVED_LONGEST_INCREASING_SUBSEQUENCE_COUNT",
    record: response.data
  });
}

export function* watchLongestIncreasingSubsequenceCount() {
  yield take("GET_LONGEST_INCREASING_SUBSEQUENCE_COUNT");
  yield fork(getCount);
}
