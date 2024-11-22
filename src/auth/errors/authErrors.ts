import { SystemError } from '../../common/handle-errors';
import { KindError } from '../../common/handle-errors';

export class AuthError extends SystemError {
  constructor(attribute: string) {
    super(`Auth with this attribute ${attribute} error`);
    this.code = 'Auth/error';
    this.name = 'AuthError';
    this.kind = KindError.NOINFO;
  }
}

