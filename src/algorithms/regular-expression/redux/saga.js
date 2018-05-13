import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/17");
  yield put({
    type: "RECEIVED_REGULAR_EXPRESSION_COUNT",
    record: response.data
  });
}

export function* watchRegularExpressionCount() {
  yield take("GET_REGULAR_EXPRESSION_COUNT");
  yield fork(getCount);
}
