import { BadRequestException, Injectable } from '@nestjs/common';
import { NotificationStrategy } from '@notification/interfaces';
import {
  EmailNotificationStrategy,
  SmsNotificationStrategy,
  PushNotificationStrategy,
} from '@notification/strategies';
import { NotificationType } from '@notification/enums';

@Injectable()
export class NotificationStrategyFactory {
  constructor(
    private readonly emailStrategy: EmailNotificationStrategy,
    private readonly smsStrategy: SmsNotificationStrategy,
    private readonly pushStrategy: PushNotificationStrategy,
  ) {}

  create(type: NotificationType): NotificationStrategy {
    switch (type) {
      case NotificationType.EMAIL:
        return this.emailStrategy;
      case NotificationType.SMS:
        return this.smsStrategy;
      case NotificationType.PUSH:
        return this.pushStrategy;
      default:
        throw new BadRequestException(
          `Unsupported notification type: ${type as string}`,
        );
    }
  }
}
