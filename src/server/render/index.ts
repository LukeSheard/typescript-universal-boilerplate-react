import { Request, Response } from "express";

export default function(req: Request, res: Response) {
  const renderFnName =
    process.env.NODE_ENV === "production" ? "./match" : "./send-file";
  return import(renderFnName).then(renderFn => renderFn.default(req, res));
}
