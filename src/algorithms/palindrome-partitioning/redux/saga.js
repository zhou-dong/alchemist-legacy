import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/14");
  yield put({
    type: "RECEIVED_PALINDROME_PARTITION_COUNT",
    record: response.data
  });
}

export function* watchPalindromePartitioningCount() {
  yield take("GET_PALINDROME_PARTITION_COUNT");
  yield fork(getCount);
}
