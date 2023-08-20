import { createCanvas } from "canvas";

import type { CanvasRenderingContext2D } from "canvas";
import type { Context, Next } from "koa";

import CONFIG from "../config";
import { useResponse } from "../hook";
import { ErrorEnum, StatusCode, successEnum } from "../type/enum";
import { randomHexColor, randomText } from "../utils";

interface VerifyCaptchaBody {
  code: string
}

interface Config {
  xOffset: number
  yOffset: number
  fontSize: number
  cSpacing: number
}

function drawCaptchaBackground(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = randomHexColor();
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height);
    ctx.lineTo(Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height);
    ctx.strokeStyle = randomHexColor();
    ctx.stroke();
  }
}

function drawCaptchaCharacters(ctx: CanvasRenderingContext2D, config: Config, captcha: string): void {
  const { cSpacing, xOffset, fontSize, yOffset } = config;

  for (let i = 0; i < captcha.length; i++) {
    const charX = xOffset + i * (fontSize * cSpacing);

    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = randomHexColor();
    ctx.fillText(captcha[i], charX, yOffset);
  }
}

async function createCaptcha(ctx: Context, next: Next): Promise<void> {
  const config: Config = {
    cSpacing: 0.6,
    fontSize: 35,
    xOffset: 10,
    yOffset: 35
  };

  const canvas = createCanvas(100, 50);
  const ctx2d = canvas.getContext("2d");
  ctx2d.fillStyle = randomHexColor();
  ctx2d.fillRect(0, 0, canvas.width, canvas.height);

  const captcha = randomText();
  ctx.session![CONFIG.CAPTCHA_KEY] = captcha;

  drawCaptchaBackground(ctx2d);
  drawCaptchaCharacters(ctx2d, config, captcha);

  ctx.type = "image/png";
  ctx.body = canvas.toBuffer();

  await next();
}

async function verifyCaptcha(ctx: Context, next: Next): Promise<void> {
  const { success, error } = useResponse(ctx);
  const { code } = ctx.request.body as VerifyCaptchaBody;
  const captcha = ctx.session![CONFIG.CAPTCHA_KEY];

  if (code === captcha) {
    await success({ msg: successEnum.VALIDATION });
  }
  else {
    await error({ msg: ErrorEnum.VALIDATION, code: StatusCode.VALIDATION_ERROR });
  }

  await next();
}

export { createCaptcha, verifyCaptcha };
