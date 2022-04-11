import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import {tokenMiddleware, corsOptionDelegate} from "./middleware";
import * as cors from "cors";

export const app = express();

export const connection = createConnection().then(async connection => {
  app.use(bodyParser.json());
  app.use(cors(corsOptionDelegate));
  app.use(tokenMiddleware);
  Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      const result = (new (route.controller as any))[route.action](req, res, next);
      if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    });
  });

  app.listen(3000);

  console.log("Express server has started on port 3000. Open http://localhost:3000/user to see results");
  return connection
}).catch(error => console.log(error));
console.log(connection)