import * as hook from "css-modules-require-hook";
import debug from "debug";
import * as Express from "express";
import { join } from "path";
import render from "./render";

const log = debug("app:server");

hook({
  generateScopedName: "[hash:base64:10]"
});

const app = Express();

if (process.env.NODE_ENV !== "production") {
  const setupWebpackMiddleware = require("./webpack").default;
  setupWebpackMiddleware(app);
} else {
  app.use(Express.static(join(__dirname, "../../", "build")));
}

app.get("*", render);

app.listen(8080, () => {
  log("Server started");
});
