import { readFile } from "node:fs/promises";

import type { Context } from "koa";

import { useResponse } from "../hook";
import { resolvePath } from "../utils";

export async function useContentRender(ctx: Context, filePath: string): Promise<void> {
  try {
    const htmlContent = await readFile(resolvePath(filePath), "utf-8");
    ctx.type = "html";
    ctx.body = htmlContent;
  }
  catch (err) {
    console.error(`Error render content file :${filePath}`, err);
    const { error } = useResponse(ctx);
    error();
  }
}
