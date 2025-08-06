import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerService } from '@security/throttler/services';
import { THROTTLER_GUARD_PROVIDER } from '@security/throttler/providers';

@Module({
  imports: [ThrottlerModule.forRootAsync(ThrottlerService.getAsyncOptions())],
  providers: [THROTTLER_GUARD_PROVIDER],
})
export class SecurityModule {}
