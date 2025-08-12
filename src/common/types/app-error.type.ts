import { HttpException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { FUNCTIONAL_ERROR_PREFIX } from '@common/constants';

export type AppError = Error | HttpException | AxiosError;

export type FunctionalErrorPrefix = typeof FUNCTIONAL_ERROR_PREFIX;

export type FunctionalErrorCode = `${FunctionalErrorPrefix}${string}`;

export type FunctionalError = {
  message: string;
  errorCode: FunctionalErrorCode;
};

export type ErrorResponse = {
  message: string;
  statusCode: number;
  errorCode?: string;
  cause?: unknown;
  details?: string;
  stack?: string;
};
