import "normalize.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { browserHistory, Router } from "react-router";
import createRoutes from "../common/routes";

const history = browserHistory;
const routes = createRoutes();

ReactDOM.render(
  <div>
    <Router history={history} routes={routes} />
  </div>,
  document.getElementById("root")
);
