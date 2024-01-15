import { CustomError } from "./custom-error";

interface ValidationError {
  msg: string;
  path?: string;
  location?: string;
  type: string;
  value?: string;
}

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid request params!");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): Array<{
    message: string;
    field: string | undefined;
  }> {
    return this.errors.map(({ msg, path }) => ({
      message: msg,
      field: path ?? undefined,
    }));
  }
}
