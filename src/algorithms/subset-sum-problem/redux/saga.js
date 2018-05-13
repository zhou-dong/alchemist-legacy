import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/11");
  yield put({
    type: "RECEIVED_SUBSET_SUM_COUNT",
    record: response.data
  });
}

export function* watchSubsetSumCount() {
  yield take("GET_SUBSET_SUM_COUNT");
  yield fork(getCount);
}
