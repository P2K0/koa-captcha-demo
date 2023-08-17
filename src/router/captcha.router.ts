import Router from "koa-router";

import { createCaptcha, verifyCaptcha } from "../middleware/captcha.middleware";

const captchaRouter = new Router({ prefix: "/captcha" });

captchaRouter.get("/", createCaptcha);
captchaRouter.post("/", verifyCaptcha);

export default captchaRouter;
