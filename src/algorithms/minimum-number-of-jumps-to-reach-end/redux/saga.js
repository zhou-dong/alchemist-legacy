import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/21");
  yield put({
    type: "RECEIVED_MINIMUM_NUMBER_OF_JUMPS_TO_REACH_END_COUNT",
    record: response.data
  });
}

export function* watchMinimumNumberOfJumpsToReachEndCount() {
  yield take("GET_MINIMUM_NUMBER_OF_JUMPS_TO_REACH_END_COUNT");
  yield fork(getCount);
}
