import vendingMachine from "../core/vending-machine";
import { Request, Response } from "express";
import { BadRequestError, ResponsePayload } from "../utils";

export const getProducts = async (req: Request, res: Response) => {
  try {
    res.send(new ResponsePayload(vendingMachine.products));
  } catch (e: any) {
    throw new BadRequestError(e.message);
  }
};
