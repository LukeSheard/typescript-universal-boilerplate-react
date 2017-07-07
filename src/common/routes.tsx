import * as React from "react";
import { IndexRoute, Redirect, Route } from "react-router";
import App from "./app";

export function loadRoute(cb) {
  return mod => cb(null, mod.default);
}

export default function() {
  return (
    <Route path="/" component={App}>
      <IndexRoute
        getComponent={(_, cb) => {
          import(/* webpackChunkName: "home" */ "./home").then(loadRoute(cb));
        }}
      />
      <Route
        path="login"
        getComponent={(_, cb) => {
          import(/* webpackChunkName: "login" */ "./login").then(loadRoute(cb));
        }}
      />
      <Route
        path="not-found"
        getComponent={(_, cb) => {
          import(/* webpackChunkName: "notfound" */ "./not-found").then(
            loadRoute(cb)
          );
        }}
      />
      <Redirect from="*" to="not-found" />
    </Route>
  );
}
