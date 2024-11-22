import { SystemError } from '../../common/handle-errors';
import { KindError } from '../../common/handle-errors';

export class NotificationNotFoundError extends SystemError {
  constructor(attribute: string) {
    super(`Notification with this attribute ${attribute} not found`);
    this.code = 'Notification/not-found';
    this.name = 'NotificationNotFoundError';
    this.kind = KindError.NOINFO;
  }
}


