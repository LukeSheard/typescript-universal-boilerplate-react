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
        import(/* webpackChunkName: "/-container" */ "./pages/app")
      )}
    >
      <IndexRoute
        getComponent={loadModule(() =>
          import(/* webpackChunkName: "/" */ "./pages/home")
        )}
      />
      <Route
        path="page"
        getComponent={loadModule(() =>
          import(/* webpackChunkName: "/page-container" */ "./pages/page")
        )}
      >
        <IndexRoute
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "/page" */ "./pages/subpage")
          )}
        />
        <Route
          path="2"
          getComponent={loadModule(() =>
            import(/* webpackChunkName: "/page/2" */ "./pages/subpage-2")
          )}
        />
      </Route>
      <Route
        path="not-found"
        getComponent={loadModule(() =>
          import(/* webpackChunkName: "/not-found" */ "./pages/not-found")
        )}
      />
    </Route>
  );
}
