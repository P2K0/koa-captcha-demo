import type { Context } from "koa";

import { ErrorEnum, StatusCode, successEnum } from "../type/enum";

interface UseResponse {
  success: Function
  error: Function
}

interface ResponseData {
  code: number
  msg: string
  data: any
}

export function useResponse(ctx: Context): UseResponse {
  async function setResponse(defaultCode: number, defaultMsg: string, params: ResponseData): Promise<void> {
    ctx.body = Object.assign({ code: defaultCode, msg: defaultMsg }, params) as ResponseData;
  }

  async function success(params: ResponseData): Promise<void> {
    await setResponse(StatusCode.SUCCESS, successEnum.SUCCESS, params);
  }

  async function error(params: ResponseData): Promise<void> {
    await setResponse(StatusCode.ERROR, ErrorEnum.ERROR, params);
  }

  return { success, error };
}
