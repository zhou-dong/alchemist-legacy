import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "index.css";

import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import rootReducer from "reducers";
import { Provider } from "react-redux";

import registerServiceWorker from "./registerServiceWorker";
import EditDistance from "algorithms/edit-distance";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <EditDistance />
  </Provider>,
  document.getElementById("redux-test")
);

registerServiceWorker();
