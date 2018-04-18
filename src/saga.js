import { call, put, all, take, fork } from "redux-saga/effects";
import axios from "./axios";

const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

const getAuthToken = () => {
  return getParameterByName("auth_token") || localStorage.getItem("auth_token");
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
