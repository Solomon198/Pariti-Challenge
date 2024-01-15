import { Request, Response } from "express";
import { ResponsePayload } from "../utils";
import vendingMachine from "../core/vending-machine";

export const getCoins = async (req: Request, res: Response) => {
  res.send(new ResponsePayload(vendingMachine.machineVault));
};

export const updateProduct = async (req: Request, res: Response) => {
  const { adjustAvailableProduct, setProductPrize, products } = vendingMachine;
  const slot = parseInt(req.params.slot);
  const { price, quantity } = req.body as { price?: number; quantity?: number };
  if (quantity) {
    adjustAvailableProduct(slot, quantity);
  }
  if (price) {
    setProductPrize(slot, price);
  }
  const product = products.find((p) => p.slot === slot);
  res.send(new ResponsePayload(product || {}));
};

export const updateCoin = async (req: Request, res: Response) => {
  const { updateCoins, machineVault } = vendingMachine;
  const coinValue = parseInt(req.params.value);
  const { quantity } = req.body;
  updateCoins(coinValue, quantity);
  const coin = machineVault.find((c) => c.value === coinValue);
  res.send(new ResponsePayload(coin || {}));
};

export const withDrawCoin = async (req: Request, res: Response) => {
  const { withdrawFunds, machineVault } = vendingMachine;
  const coinValue = parseInt(req.params.value);
  const { quantity } = req.body;
  withdrawFunds(coinValue, quantity);
  const coin = machineVault.find((c) => c.value === coinValue);
  res.send(new ResponsePayload(coin || {}));
};
