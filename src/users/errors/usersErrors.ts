import { SystemError } from '../../common/handle-errors';
import { KindError } from '../../common/handle-errors';

export class UserNotFoundError extends SystemError {
  constructor(attribute: string) {
    super(`User with this attribute ${attribute} not found`);
    this.code = 'user/not-found';
    this.name = 'UserNotFoundError';
    this.kind = KindError.NOINFO;
  }
}


export class UserUpdateError extends SystemError {
  constructor(attribute: string) {
    super(`User with this attribute ${attribute} error to update`);
    this.code = 'user/update-error';
    this.name = 'UserUpdateError';
    this.kind = KindError.NOINFO;
  }
}


export class UserCreateError extends SystemError {
  constructor(attribute: string) {
    super(`User with this attribute ${attribute} error to create`);
    this.code = 'user/create-error';
    this.name = 'UserCreateError';
    this.kind = KindError.NOINFO;
  }
}