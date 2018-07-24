import "bootstrap/dist/css/bootstrap.css";

import "assets/css/material-dashboard-react.css?v=1.3.0";
import "index.css";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { Router, Route, Switch } from "react-router-dom";

import rootReducer from "reducers";
import rootSaga from "sagas";
import registerServiceWorker from "registerServiceWorker";
import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("alchemist")
);

registerServiceWorker();
