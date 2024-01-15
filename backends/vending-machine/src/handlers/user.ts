import { Request, Response } from "express";
import { ResponsePayload } from "../utils";
import vendingMachine from "../core/vending-machine";

export const depositFunds = async (req: Request, res: Response) => {
  const { depositFunds, userDeposit } = vendingMachine;
  const { coinValue } = req.body;
  depositFunds(parseInt(coinValue));
  res.send(new ResponsePayload({ userDeposits: userDeposit }));
};

export const selectedSlot = async (req: Request, res: Response) => {
  const { selectSlot, selectedSlot } = vendingMachine;
  const { slot } = req.body;
  selectSlot(parseInt(slot));
  res.send(new ResponsePayload({ selectedSlot }));
};

export const buyProduct = async (req: Request, res: Response) => {
  const { confirmPurchase, products, selectedSlot } = vendingMachine;
  const change = confirmPurchase();
  const product = products.find((p) => p.slot === selectedSlot);
  res.send(new ResponsePayload({ change, product }));
};
