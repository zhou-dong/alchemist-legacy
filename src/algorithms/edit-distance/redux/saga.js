import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

console.log(axios);

function* getEditDistanceCount() {
  const response = yield call(axios.get, "/user/me");
  yield put({
    type: "RECEIVED_EDIT_DISTANCE_COUNT",
    count: response.data
  });
}

export function* watchGetEditDistanceCount() {
  yield take("GET_EDIT_DISTANCE_COUNT");
  yield fork();
}
