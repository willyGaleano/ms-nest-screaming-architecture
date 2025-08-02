export type LoggerDetail = Record<string, unknown>;

export type LoggerErrorInfo = {
  message: string;
  body?: unknown;
};

export type LoggerMsg = {
  msg: string;
  detail?: LoggerDetail;
  errorInfo?: LoggerErrorInfo;
};
