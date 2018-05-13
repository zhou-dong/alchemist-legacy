import { call, put, take, fork } from "redux-saga/effects";
import axios from "../../../axios";

function* getCount() {
  const response = yield call(axios.get, "/record/algorithm/12");
  yield put({
    type: "RECEIVED_LONGEST_PALINDROMIC_SUBSTRING_COUNT",
    record: response.data
  });
}

export function* watchLongestPalindromicSubstringCount() {
  yield take("GET_LONGEST_PALINDROMIC_SUBSTRING_COUNT");
  yield fork(getCount);
}
