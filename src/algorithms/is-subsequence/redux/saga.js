import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/2");
  yield put({
    type: "RECEIVED_IS_SUBSEQUENCE_COUNT",
    record: response.data
  });
}

export function* watchIsSubSequenceCount() {
  yield take("GET_IS_SUBSEQUENCE_COUNT");
  yield fork(getCount);
}
