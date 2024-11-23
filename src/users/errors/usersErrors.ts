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


export class UserAlreadyExist extends SystemError {
  constructor(attribute: string) {
    super(`User with this attribute ${attribute} already exist`);
    this.code = 'user/already-exist';
    this.name = 'UserAlreadyExist';
    this.kind = KindError.NOINFO;
  }
}