import { Module } from '@nestjs/common';
import { HttpClientModule } from '@http-client/http-client.module';
import { ThirdPartyModule } from '@third-party/third-party.module';
import { NotificationConsumer } from '@notification/consumers';
import { NotificationService } from '@notification/services';
import { NotificationStrategyFactory } from '@notification/factories';
import {
  EmailNotificationStrategy,
  SmsNotificationStrategy,
  PushNotificationStrategy,
} from '@notification/strategies';

@Module({
  imports: [HttpClientModule, ThirdPartyModule],
  controllers: [NotificationConsumer],
  providers: [
    NotificationService,
    NotificationStrategyFactory,
    EmailNotificationStrategy,
    SmsNotificationStrategy,
    PushNotificationStrategy,
  ],
})
export class NotificationModule {}
