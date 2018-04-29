import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getEditDistanceCount() {
  const response = yield call(axios.get, "/record/algorithm/1");
  yield put({
    type: "RECEIVED_IS_SUBSEQUENCE_COUNT",
    record: response.data
  });
}

export function* watchGetEditDistanceCount() {
  yield take("GET_IS_SUBSEQUENCE_COUNT");
  yield fork(getEditDistanceCount);
}
