import { all } from "redux-saga/effects";
import { watchGetUser } from "layout/saga";
import e from "algorithms/edit-distance/redux/saga";

export default function* rootSaga() {
  yield all([watchGetUser()]);
}
