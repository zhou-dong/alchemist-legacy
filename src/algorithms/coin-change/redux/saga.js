import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/8");
  yield put({
    type: "RECEIVED_COIN_CHANGE_HOW_MANY_WAYS_COUNT",
    record: response.data
  });
}

export function* watchCoinChangeHowManyWaysCount() {
  yield take("GET_COIN_CHANGE_HOW_MANY_WAYS_COUNT");
  yield fork(getCount);
}
