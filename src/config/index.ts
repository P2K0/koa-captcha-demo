interface Config {
  PORT: number
  CAPTCHA_KEY: string
  APP_KEYS: string
}

const config: Config = {
  PORT: 3000,
  CAPTCHA_KEY: "random-captcha",
  APP_KEYS: "koa-captcha-demo"
};

export default config;
