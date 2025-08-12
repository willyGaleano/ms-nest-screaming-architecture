import { Injectable, Logger } from '@nestjs/common';
import { LoggerService } from '@logger/services';
import { NotificationStrategy } from '@notification/interfaces';
import { SmsNotificationPayload } from '@notification/dtos';

@Injectable()
export class SmsNotificationStrategy implements NotificationStrategy {
  private readonly logger = new Logger(SmsNotificationStrategy.name);

  async send(__: SmsNotificationPayload): Promise<boolean> {
    this.logger.warn(
      LoggerService.createLogEntry(
        'SMS notification strategy - Not implemented yet',
      ),
    );

    return Promise.resolve(false);
  }
}
