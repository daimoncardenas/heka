import { KindError } from './kindError';

export class SystemError extends Error {
  code: string;
  kind: KindError;

  constructor(message: string) {
    super(message);
  }
}
