import "css-modules-require-hook/preset";
import debug from "debug";
import * as Express from "express";

import render from "./middleware/render";
import webpack from "./middleware/webpack";

const log = debug("app:server");

const app: Express.Express = Express();

app.use(webpack);

app.get("*", render);

webpack.waitUntilValid(() => {
  /*
    Webpack Middleware
    NOTE: In Production we close the middleware to stop looking for updates.
  */
  if (process.env.NODE_ENV === "production") {
    webpack.close();
  }
  app.listen(8080, () => {
    log("Server started");
  });
});
