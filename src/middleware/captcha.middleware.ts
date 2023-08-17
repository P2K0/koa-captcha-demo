import Canvas from "canvas";

import type { Context, Next } from "koa";

import CONFIG from "../config";
import { useResponse } from "../hook";
import { ErrorEnum, StatusCode, successEnum } from "../type/enum";
import { randomHexColor, randomText } from "../utils";

interface VerifyCaptchaBody {
  code: string
}

function createCaptcha(ctx: Context) {
  const xOffset = 10;
  const yOffset = 35;
  const fontSize = 35;

  const canvas = Canvas.createCanvas(100, 50);
  const ctx2d = canvas.getContext("2d");
  ctx2d.fillStyle = randomHexColor();
  ctx2d.fillRect(0, 0, canvas.width, canvas.height);

  const captcha = randomText();
  ctx.session![CONFIG.CAPTCHA_KEY] = captcha;

  for (let i = 0; i < captcha.length; i++) {
    const charX = xOffset + i * (fontSize * 0.7);

    ctx2d.font = `${fontSize}px Arial`;
    ctx2d.fillStyle = randomHexColor();
    ctx2d.fillText(captcha[i], charX, yOffset);
  }

  ctx.type = "image/png";
  ctx.body = canvas.toBuffer();
}

async function verifyCaptcha(ctx: Context, next: Next): Promise<void> {
  const { success, error } = useResponse(ctx, next);
  const { code } = ctx.request.body as VerifyCaptchaBody;
  const captcha = ctx.session![CONFIG.CAPTCHA_KEY];

  if (code === captcha) {
    await success({ msg: successEnum.VALIDATION });
  }
  else {
    await error({ msg: ErrorEnum.VALIDATION, code: StatusCode.VALIDATION_ERROR });
  }
}

export { createCaptcha, verifyCaptcha };
