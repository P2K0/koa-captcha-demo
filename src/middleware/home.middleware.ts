import type { Context, Next } from "koa";

import { useContentRender } from "../hook";

async function renderHomePage(ctx: Context, next: Next): Promise<void> {
  await useContentRender(ctx, "public/index.html");

  await next();
}

export {
  renderHomePage
};
