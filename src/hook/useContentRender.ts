import { readFile } from "node:fs/promises";

import type { Context } from "koa";

import { useResponse } from "../hook";
import { resolvePath } from "../utils";

export async function useContentRender(ctx: Context, fileName: string): Promise<void> {
  try {
    const htmlContent = await readFile(resolvePath(`/views/${fileName}`), "utf-8");
    ctx.type = "html";
    ctx.body = htmlContent;
  }
  catch (err) {
    console.error(`Error render content file :${fileName}`, err);
    const { error } = useResponse(ctx);
    error();
  }
}
