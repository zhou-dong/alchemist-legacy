import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/9");
  yield put({
    type: "RECEIVED_MINIMUM_PATH_SUM_COUNT",
    record: response.data
  });
}

export function* watchMinimumPathSumCount() {
  yield take("GET_MINIMUM_PATH_SUM_COUNT");
  yield fork(getCount);
}
