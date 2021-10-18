import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render } from "react-dom";
import { Provider } from "react-redux";
import index from "./store";
import "react-sortable-tree/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "./css/styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={index}>
    <App />
  </Provider>,
  rootElement
);
