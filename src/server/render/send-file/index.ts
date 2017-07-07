import { Request, Response } from "express";
import { readFile } from "fs";
import { join } from "path";

export default function(_req: Request, res: Response): void {
  return readFile(join(__dirname, "index.html"), "utf8", (err, file) => {
    if (err) {
      throw err;
    }
    res.send(file);
  });
}
