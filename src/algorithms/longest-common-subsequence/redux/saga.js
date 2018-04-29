import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/3");
  yield put({
    type: "RECEIVED_LONGEST_COMMON_SUBSEQUENCE_COUNT",
    record: response.data
  });
}

export function* watchLongestCommonSubsequenceCount() {
  yield take("GET_LONGEST_COMMON_SUBSEQUENCE_COUNT");
  yield fork(getCount);
}
