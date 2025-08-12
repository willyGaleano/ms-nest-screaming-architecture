import { Controller } from '@nestjs/common';
import {
  KafkaRetriableException,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { NotificationService } from '@notification/services';
import { NotificationType } from '@notification/enums';
import { EmailNotificationPayload } from '@notification/dtos';
import { NOTIFICATION_TOPICS } from '@notification/constants';

@Controller()
export class NotificationConsumer {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern(NOTIFICATION_TOPICS.EMAIL_NOTIFICATION)
  async handleEmailNotification(
    @Payload() payload: EmailNotificationPayload,
  ): Promise<void> {
    try {
      await this.notificationService.sendNotification(
        NotificationType.EMAIL,
        payload,
      );
    } catch (error: unknown) {
      throw new KafkaRetriableException({
        message: 'Error sending email notification',
        cause: error,
      });
    }
  }
}
