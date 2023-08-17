import type Koa from "koa";
import type Router from "koa-router";

import { useContextFile } from "../hook";

export async function setupRouter(app: Koa): Promise<void> {
  const routeFiles: Router[] = await useContextFile(__dirname);

  if (!routeFiles.length) return;

  routeFiles.forEach((router: Router) => app.use(router.routes()).use(router.allowedMethods()));
}
