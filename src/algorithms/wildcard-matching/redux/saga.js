import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/18");
  yield put({
    type: "RECEIVED_WILDCARD_MATCHING_COUNT",
    record: response.data
  });
}

export function* watchWildcardMatchingCount() {
  yield take("GET_WILDCARD_MATCHING_COUNT");
  yield fork(getCount);
}
