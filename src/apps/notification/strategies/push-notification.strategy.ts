import { Injectable, Logger } from '@nestjs/common';
import { LoggerService } from '@logger/services';
import { NotificationStrategy } from '@notification/interfaces';
import { PushNotificationPayload } from '@notification/dtos';

@Injectable()
export class PushNotificationStrategy implements NotificationStrategy {
  private readonly logger = new Logger(PushNotificationStrategy.name);

  async send(__: PushNotificationPayload): Promise<boolean> {
    this.logger.warn(
      LoggerService.createLogEntry(
        'Push notification strategy - Not implemented yet',
      ),
    );

    return Promise.resolve(false);
  }
}
