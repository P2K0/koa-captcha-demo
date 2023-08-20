import Cors from "@koa/cors";
import Koa from "koa";
import BodyParser from "koa-bodyparser";
import Session from "koa-session";

import CONFIG from "../config";
import { setupRouter } from "../router";

const app: Koa = new Koa();

async function setupApp(): Promise<void> {
  app.keys = [CONFIG.APP_KEYS];

  app.use(Cors());
  app.use(BodyParser());
  app.use(Session({}, app));

  setupRouter(app);
}

export {
  setupApp,
  app
};
