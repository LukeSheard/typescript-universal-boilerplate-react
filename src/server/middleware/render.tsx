import { NextFunction, Request, Response } from "express";
import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { createMemoryHistory, match, RouterContext } from "react-router";
import createRoutes from "../../common/routes";

export function toChunkList(chunks: string | string[] | undefined): string[] {
  return chunks ? (Array.isArray(chunks) ? chunks : [chunks]) : [];
}

export class HTML extends React.Component<any, any> {
  public render() {
    const { children, assets, url } = this.props;
    return (
      <html>
        <head>
          <title>My App</title>
          {this.createStylesheet(assets.common)}
          {this.createStylesheet(assets.main)}
          {this.createStylesheet(assets[url])}
        </head>
        <body>
          <div
            id="root"
            dangerouslySetInnerHTML={{
              __html: ReactDOM.renderToString(children)
            }}
          />
          {this.createScript(assets.common)}
          {this.createScript(assets.main)}
          {this.createScript(assets[url])}
        </body>
      </html>
    );
  }

  private createScript(chunks) {
    return toChunkList(chunks)
      .filter(script => script.endsWith(".js"))
      .map(script =>
        <script key={script} src={`/${script}`} type="text/javascript" />
      );
  }

  private createStylesheet(chunks) {
    return toChunkList(chunks)
      .filter(sheet => sheet.endsWith(".css"))
      .map(sheet => <link key={sheet} href={`/${sheet}`} rel="stylesheet" />);
  }
}

export function createPage(req: Request, res: Response, renderProps): string {
  const assets = res.locals.webpackStats.toJson().assetsByChunkName;
  return ReactDOM.renderToStaticMarkup(
    <HTML assets={assets} url={req.url}>
      <div>
        <RouterContext {...renderProps} />
      </div>
    </HTML>
  );
}

export default function render(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const history = createMemoryHistory({
    entries: [req.url]
  });
  const routes = createRoutes();

  match({ history, routes }, (error, redirectLocation, renderProps) => {
    if (error) {
      return next(error);
    } else if (redirectLocation) {
      return res
        .status(302)
        .redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.status(200);
      res.write("<!doctype HTML>");
      res.write(createPage(req, res, renderProps));
      return res.end();
    }

    return res.status(404).send("not-found");
  });
}
