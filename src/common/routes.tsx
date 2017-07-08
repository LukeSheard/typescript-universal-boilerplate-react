import debug from "debug";
import * as React from "react";
import { IndexRoute, Redirect, Route } from "react-router";
import App from "./app";

const log = debug("app:routing");

export function loadRoute(cb) {
  return mod => cb(null, mod.default);
}

export function loadModule(modImport) {
  return (_, cb) => {
    modImport.then(({ default: mod }) => cb(null, mod)).catch(error => {
      log(error);
      cb("Error");
    });
  };
}

export default function() {
  return (
    <Route path="/" component={App}>
      <IndexRoute
        getComponent={loadModule(import(/* webpackChunkName: "/" */ "./home"))}
      />
      <Route
        path="page"
        getComponent={loadModule(
          import(/* webpackChunkName: "/page" */ "./page")
        )}
      />
      <Route
        path="not-found"
        getComponent={loadModule(
          import(/* webpackChunkName: "/not-found" */ "./not-found")
        )}
      />
      <Redirect from="*" to="not-found" />
    </Route>
  );
}
