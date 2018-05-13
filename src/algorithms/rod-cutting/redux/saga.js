import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/19");
  yield put({
    type: "RECEIVED_ROD_CUTTING_COUNT",
    record: response.data
  });
}

export function* watchRodCuttingCount() {
  yield take("GET_ROD_CUTTING_COUNT");
  yield fork(getCount);
}
