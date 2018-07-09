import "bootstrap/dist/css/bootstrap.css";
import "index.css";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { BrowserRouter as Router, Route } from "react-router-dom";

import rootReducer from "reducers";
import rootSaga from "sagas";
import registerServiceWorker from "registerServiceWorker";

import Header from "layout/header";
import Footer from "layout/footer";
import Algorithm from "routes/algorithm";
import Trees from "routes/trees";
import DPs from "routes/dp";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={DPs} />
        <Route path="/algorithms" component={Algorithm} />
        <Route path="/tag/trees" component={Trees} />
        <Route exact path="/tag/dynamic-programming" component={DPs} />
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById("alchemist")
);

registerServiceWorker();
