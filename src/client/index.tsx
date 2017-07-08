import "normalize.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { browserHistory, match, Router } from "react-router";
import createRoutes from "../common/routes";

const history = browserHistory;
const routes = createRoutes();

match({ history, routes }, (_, __, renderProps) => {
  return ReactDOM.render(
    <div>
      <Router {...renderProps} />
    </div>,
    document.getElementById("root")
  );
});
