import { type Request, type Response, type NextFunction } from "express";
import { CustomError } from "../utils";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = err.message;
  if (err instanceof CustomError) {
    // can use logger here
    if (process.env.NODE_ENV !== "test") console.log(err.message);
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  if (process.env.NODE_ENV !== "test") console.log(err.message);
  return res.status(500).send({ errors: [{ message: err.message }] });
};
