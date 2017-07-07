import * as hook from "css-modules-require-hook";
import * as Express from "express";
import { join } from "path";
import render from "./render";

hook({
  generateScopedName:
    process.env.NODE_ENV === "production"
      ? "[hash:base64:10]"
      : "[name]__[local]___[hash:base64:5]"
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
  console.log("Server started");
});
