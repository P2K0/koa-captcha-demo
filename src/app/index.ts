import { join } from "node:path";

import Cors from "@koa/cors";
import Koa from "koa";
import BodyParser from "koa-bodyparser";
import Session from "koa-session";
import Static from "koa-static";

import CONFIG from "../config";
import { setupRouter } from "../router";

const app: Koa = new Koa();

async function setupApp(): Promise<void> {
  app.keys = [CONFIG.APP_KEYS];

  app.use(Cors());
  app.use(BodyParser());
  app.use(Static(join(__dirname, "../", "/public")));
  app.use(Session({}, app));

  await setupRouter(app);
}

export {
  setupApp,
  app
};
