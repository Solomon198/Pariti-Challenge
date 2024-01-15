import vendingMachine from "../core/vending-machine";
import { Request, Response } from "express";
import { ResponsePayload } from "../utils";

export const getProducts = async (req: Request, res: Response) => {
  res.send(new ResponsePayload(vendingMachine.products));
};
