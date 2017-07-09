import debug from "debug";
import * as React from "react";
import { IndexRoute, Route } from "react-router";

const log = debug("app:routing");

export function loadModule(modImport) {
  return (_, cb) => {
    modImport().then(({ default: mod }) => cb(null, mod)).catch(error => {
      log(error);
      cb("Error");
    });
  };
}

export default function() {
  return (
    <Route
      path="/"
      getComponent={loadModule(() =>
        import(/* webpackChunkName: "/-container" */ "./app")
      )}
    >
      <IndexRoute
        getComponent={loadModule(() =>
          import(/* webpackChunkName: "/" */ "./home")
        )}
      />
      <Route
        path="page"
        getComponent={loadModule(() =>
          import(/* webpackChunkName: "/page-container" */ "./page")
        )}
      >
        <IndexRoute
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "/page" */ "./subpage")
          )}
        />
        <Route
          path="2"
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "/page/2" */ "./subpage-2")
          )}
        />
      </Route>
      <Route
        path="not-found"
        getComponent={loadModule(() =>
          import(/* webpackChunkName: "/not-found" */ "./not-found")
        )}
      />
    </Route>
  );
}
