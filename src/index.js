import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import { initSentry } from "./utils/sentry";
import { Amplitude } from "./utils/amplitude";

ReactDOM.render(<App />, document.getElementById("root"));

const isConnectedInPWA = window.location.search.indexOf("source=pwa") > -1;

Amplitude.logEvent("CONNECT", {
  pwa: isConnectedInPWA,
  referrer: document.referrer
});

initSentry();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
