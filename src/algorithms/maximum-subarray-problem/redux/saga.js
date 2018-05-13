import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/10");
  yield put({
    type: "RECEIVED_MAXIMUM_SUBARRAY_COUNT",
    record: response.data
  });
}

export function* watchMaximumSubarrayCount() {
  yield take("GET_MAXIMUM_SUBARRAY_COUNT");
  yield fork(getCount);
}
