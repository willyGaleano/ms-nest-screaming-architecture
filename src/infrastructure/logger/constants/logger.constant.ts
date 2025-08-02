import { LogLevel } from '@logger/enums';

export const logLevelValues = [
  LogLevel.FATAL,
  LogLevel.ERROR,
  LogLevel.WARN,
  LogLevel.INFO,
  LogLevel.DEBUG,
  LogLevel.TRACE,
] as const;

export const LOGGER_MESSAGE_KEY_DEFAULT = 'msg';
export const LOGGER_TARGET_DEFAULT = 'pino-pretty';
export const LOGGER_ERROR_KEY_DEFAULT = 'error';
