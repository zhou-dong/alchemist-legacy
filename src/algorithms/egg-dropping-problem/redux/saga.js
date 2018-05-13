import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/20");
  yield put({
    type: "RECEIVED_EGG_DROPPING_PROBLEM_COUNT",
    record: response.data
  });
}

export function* watchEggDroppingProbleamCount() {
  yield take("GET_EGG_DROPPING_PROBLEM_COUNT");
  yield fork(getCount);
}
