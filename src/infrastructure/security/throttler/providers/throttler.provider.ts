import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

export const THROTTLER_GUARD_PROVIDER: Provider = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};
