import { call, put, all, take, fork } from "redux-saga/effects";
import axios from "./axios";
import { getParameterByName, locationReplace } from "utils/window-helper";

const getAuthToken = () => {
  const authToken =
    getParameterByName("auth_token") || localStorage.getItem("auth_token");
  if (getParameterByName("auth_token")) {
    locationReplace();
  }
  return authToken;
};

export function* getUser(authToken) {
  localStorage.setItem("auth_token", authToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  const response = yield call(axios.get, "/user/me");
  yield put({ type: "UPDATE_USER", user: response.data });
}

export function* watchGetUser() {
  yield take("GET_USER");
  const authToken = getAuthToken();
  if (authToken) {
    yield fork(getUser, authToken);
  }
}

export default function* rootSaga() {
  yield all([watchGetUser()]);
}
