import { HttpException } from '@nestjs/common';

export type AppError = Error | HttpException;
