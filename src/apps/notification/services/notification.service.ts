import { Injectable, Logger } from '@nestjs/common';
import { LoggerService } from '@logger/services';
import { NotificationStrategyFactory } from '@notification/factories';
import { NotificationType } from '@notification/enums';
import { NotificationPayload } from '@notification/types';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly notificationStrategyFactory: NotificationStrategyFactory,
  ) {}

  async sendNotification(
    type: NotificationType,
    payload: NotificationPayload,
  ): Promise<boolean> {
    try {
      this.logger.debug(
        LoggerService.createLogEntry('Sending notification', { type, payload }),
      );

      const strategy = this.notificationStrategyFactory.create(type);

      return await strategy.send(payload);
    } catch (error) {
      this.logger.error(
        LoggerService.createLogEntry(
          'Error sending notification',
          { type },
          error,
        ),
      );
      throw error;
    }
  }
}
