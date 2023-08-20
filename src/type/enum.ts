enum StatusCode {
  SUCCESS = 200,
  ERROR = 500,
  VALIDATION_ERROR = 422
}

enum ErrorEnum {
  ERROR = "Internal Server Error",
  VALIDATION = "验证码错误"
}

enum successEnum {
  SUCCESS = "success",
  VALIDATION = "验证码校验成功"
}

export { StatusCode, successEnum, ErrorEnum };
