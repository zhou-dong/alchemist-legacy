import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/5");
  yield put({
    type: "RECEIVED_WORD_BREAK_ONE_COUNT",
    record: response.data
  });
}

export function* watchGetWordBreakOneCount() {
  yield take("GET_WORD_BREAK_ONE_COUNT");
  yield fork(getCount);
}
