import { Request, Response } from "express";
import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { createMemoryHistory, match, RouterContext } from "react-router";
import createRoutes from "../../common/routes";
const manifest = require("../../../build/manifest.json");

export class HTML extends React.Component<any, any> {
  public render() {
    return (
      <html>
        <head>
          <title>My App</title>
          <link href={`/${manifest["common.css"]}`} rel="stylesheet" />
          <link href={`/${manifest["main.css"]}`} rel="stylesheet" />
        </head>
        <body>
          <div
            id="root"
            dangerouslySetInnerHTML={{
              __html: ReactDOM.renderToString(this.props.children)
            }}
          />
          <script src={`/${manifest["common.js"]}`} type="text/javascript" />
          <script src={`/${manifest["main.js"]}`} type="text/javascript" />
        </body>
      </html>
    );
  }
}

export function createPage(renderProps): string {
  return ReactDOM.renderToStaticMarkup(
    <HTML>
      <div>
        <RouterContext {...renderProps} />
      </div>
    </HTML>
  );
}

export default function(req: Request, res: Response): void {
  const history = createMemoryHistory({
    entries: [req.url]
  });
  const routes = createRoutes();

  match({ history, routes }, (error, redirectLocation, renderProps) => {
    if (error) {
      return res.status(500).send(error);
    } else if (redirectLocation) {
      return res
        .status(302)
        .redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.status(200);
      res.write("<!doctype HTML>");
      res.write(createPage(renderProps));
      return res.end();
    }

    return res.status(404).redirect("/not-found");
  });
}
