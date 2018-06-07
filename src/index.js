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
import DynamicProgramming from "routes/dp";
import Algorithms from "routes/algorithms";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Header />
        <Route exact path="/" component={DynamicProgramming} />
        <Route path="/algorithms" component={Algorithms} />
        <Route
          exact
          path="/tag/dynamic-programming"
          component={DynamicProgramming}
        />
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById("alchemist")
);

registerServiceWorker();
