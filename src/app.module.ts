import { Module } from '@nestjs/common';
import { ConfigAppModule } from '@config/config.module';
import { ContextStoreModule } from '@context-store/context-store.module';
import { LoggerAppModule } from '@logger/logger.module';
import { SecurityModule } from '@security/security.module';
import { CacheModule } from '@cache/cache.module';
import { DbModule } from '@db/db.module';
import { HttpClientModule } from '@http-client/http-client.module';
import { KafkaModule } from '@broker/kafka/kafka.module';
import { ThirdPartyModule } from '@third-party/third-party.module';
import { HealthModule } from '@health/health.module';
import { NotificationModule } from '@notification/notification.module';

@Module({
  imports: [
    ConfigAppModule,
    ContextStoreModule,
    LoggerAppModule,
    SecurityModule,
    CacheModule,
    DbModule,
    HttpClientModule,
    KafkaModule,
    ThirdPartyModule,
    HealthModule,
    NotificationModule,
  ],
})
export class AppModule {}
