import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/7");
  yield put({
    type: "RECEIVED_COIN_CHANGE_FEWEST_NUMBER_COUNT",
    record: response.data
  });
}

export function* watchCoinChangeFewestNumberCount() {
  yield take("GET_COIN_CHANGE_FEWEST_NUMBER_COUNT");
  yield fork(getCount);
}
