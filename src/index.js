import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./redux/index";
import "./index.css";
import App from "./App";
import { remoteMiddleware } from "./redux/remote";

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const url = window.location.href.replace(/^https?:/, "ws:");

const store = createStore(
  reducer,
  composer(applyMiddleware(remoteMiddleware(url)))
);

ReactDOM.render(
  <Provider store={store}>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui"
    />
    <App />
  </Provider>,
  document.getElementById("root")
);
