import { all } from "redux-saga/effects";
import { watchGetUser } from "layout/saga";
import { watchGetEditDistanceCount } from "algorithms/edit-distance/redux/saga";
import { watchIsSubSequenceCount } from "algorithms/is-subsequence/redux/saga";

export default function* rootSaga() {
  yield all([
    watchGetUser(),
    watchGetEditDistanceCount(),
    watchIsSubSequenceCount()
  ]);
}
