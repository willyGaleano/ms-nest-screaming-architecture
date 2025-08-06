import { Module } from '@nestjs/common';
import { ConfigAppModule } from '@config/config.module';
import { ContextStoreModule } from '@context-store/context-store.module';
import { LoggerAppModule } from '@logger/logger.module';
import { CacheModule } from '@cache/cache.module';
import { HealthModule } from '@health/health.module';

@Module({
  imports: [
    ConfigAppModule,
    ContextStoreModule,
    LoggerAppModule,
    CacheModule,
    HealthModule,
  ],
})
export class AppModule {}
