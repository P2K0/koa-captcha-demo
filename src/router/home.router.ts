import Router from "koa-router";

import { renderHomePage } from "../middleware/home.middleware";

const homeRouter = new Router({ prefix: "/" });

homeRouter.get("/", renderHomePage);

export default homeRouter;
