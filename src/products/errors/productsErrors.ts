import { SystemError } from '../../common/handle-errors';
import { KindError } from '../../common/handle-errors';

export class ProductNotFoundError extends SystemError {
  constructor(attribute: string) {
    super(`Product with this attribute ${attribute} not found`);
    this.code = 'Product/not-found';
    this.name = 'ProductNotFoundError';
    this.kind = KindError.NOINFO;
  }
}


export class ProductUpdateError extends SystemError {
  constructor(attribute: string) {
    super(`Product with this attribute ${attribute} error to update`);
    this.code = 'Product/update-error';
    this.name = 'ProductUpdateError';
    this.kind = KindError.NOINFO;
  }
}

export class ProductCreateError extends SystemError {
  constructor(attribute: string) {
    super(`Product with this attribute ${attribute} error to create`);
    this.code = 'Product/create-error';
    this.name = 'ProductCreateError';
    this.kind = KindError.NOINFO;
  }
}