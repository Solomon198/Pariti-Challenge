import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../utils/errors/validation-error";

export const ValidateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  next();
};
