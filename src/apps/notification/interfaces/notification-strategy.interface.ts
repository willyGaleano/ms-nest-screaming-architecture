import { NotificationPayload } from '@notification/types';

export interface NotificationStrategy {
  send(payload: NotificationPayload): Promise<boolean>;
}
