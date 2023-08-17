import { app, setupApp } from "./app";
import CONFIG from "./config";

(async (): Promise<void> => {
  try {
    await setupApp();

    app.listen(CONFIG.PORT, (): void => {
      console.warn("服务启动成功 ！！");
      console.log(`http://127.0.0.1:${CONFIG.PORT}`);
    });
  }
  catch (err) {
    console.warn("服务启动失败 ！！");
    throw err;
  }
})();
