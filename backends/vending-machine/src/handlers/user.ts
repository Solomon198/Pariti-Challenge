import { Request, Response } from "express";
import { BadRequestError, ResponsePayload } from "../utils";
import vendingMachine from "../core/vending-machine";

export const depositFunds = async (req: Request, res: Response) => {
  try {
    const { depositFunds, userDeposit } = vendingMachine;
    const { coinValue } = req.body;
    depositFunds(parseInt(coinValue));
    res.send(new ResponsePayload({ userDeposits: userDeposit }));
  } catch (e: any) {
    throw new BadRequestError(e.message);
  }
};

export const selectedSlot = async (req: Request, res: Response) => {
  try {
    const { selectSlot, selectedSlot } = vendingMachine;
    const { slot } = req.body;
    selectSlot(parseInt(slot));
    res.send(new ResponsePayload({ selectedSlot }));
  } catch (e: any) {
    throw new BadRequestError(e.message);
  }
};

export const buyProduct = async (req: Request, res: Response) => {
  try {
    const { confirmPurchase, products, selectedSlot } = vendingMachine;
    const change = confirmPurchase();
    const product = products.find((p) => p.slot === selectedSlot);
    res.send(new ResponsePayload({ change, product }));
  } catch (e: any) {
    throw new BadRequestError(e.message);
  }
};
