import { FunctionalError } from '@common/types';
import { UserErrorCode } from '@user/enums';

export const USER_NOT_FOUND_ERROR = (): FunctionalError => ({
  message: 'User not found',
  errorCode: UserErrorCode.USER_NOT_FOUND,
});

export const USER_ALREADY_EXISTS_ERROR = (): FunctionalError => ({
  message: 'User already exists',
  errorCode: UserErrorCode.USER_ALREADY_EXISTS,
});

export const USER_UNAVAILABLE_ERROR = (): FunctionalError => ({
  message: 'User is currently unavailable',
  errorCode: UserErrorCode.USER_UNAVAILABLE,
});
