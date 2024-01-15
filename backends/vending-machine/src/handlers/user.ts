import { Request, Response } from "express";
import { BadRequestError, ResponsePayload } from "../utils";
import vendingMachine from "../core/vending-machine";

export const depositFunds = async (req: Request, res: Response) => {
  try {
    const { coinValue } = req.body;
    vendingMachine.depositFunds(parseInt(coinValue));
    res.send(new ResponsePayload({ userDeposits: vendingMachine.userDeposit }));
  } catch (e: any) {
    throw new BadRequestError(e.message);
  }
};

export const selectSlot = async (req: Request, res: Response) => {
  try {
    const { slot } = req.body;
    vendingMachine.selectSlot(parseInt(slot));
    res.send(new ResponsePayload({ slot }));
  } catch (e: any) {
    throw new BadRequestError(e.message);
  }
};

export const buyProduct = async (req: Request, res: Response) => {
  try {
    const change = vendingMachine.confirmPurchase();
    const product = vendingMachine.products.find(
      (p) => p.slot === vendingMachine.selectedSlot
    );
    res.send(new ResponsePayload({ change, product }));
  } catch (e: any) {
    throw new BadRequestError(e.message);
  }
};
