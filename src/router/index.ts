import type Koa from "koa";
import type Router from "koa-router";

import captchaRouter from "./captcha.router";
import homeRouter from "./home.router";

export function setupRouter(app: Koa): void {
  const routeFiles: Router[] = [homeRouter, captchaRouter];

  if (!routeFiles.length) return;

  routeFiles.forEach((router: Router) => app.use(router.routes()).use(router.allowedMethods()));
}
