import "normalize.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { browserHistory, match, Router } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import createRoutes from "../common/routes";
import createStore from "../common/store";

const INITIAL_STATE = JSON.parse(
  (document.getElementById("app-initial-state") as HTMLElement).innerHTML
);
const store = ((window as any).store = createStore(
  browserHistory,
  INITIAL_STATE
));
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes();

match({ history, routes }, (_, __, renderProps) => {
  return ReactDOM.render(
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>,
    document.getElementById("root")
  );
});
