import { Request, Response } from "express";
import { BadRequestError, ResponsePayload } from "../utils";
import vendingMachine from "../core/vending-machine";

export const getCoins = async (req: Request, res: Response) => {
  try {
    res.send(new ResponsePayload(vendingMachine.machineVault));
  } catch (e: any) {
    throw new BadRequestError(e.message);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const slot = parseInt(req.params.slot);
    const { price, quantity } = req.body as {
      price?: number;
      quantity?: number;
    };

    if (quantity || quantity === 0) {
      vendingMachine.adjustAvailableProduct(slot, quantity);
    }
    if (price || price === 0) {
      vendingMachine.setProductPrize(slot, price);
    }
    const product = vendingMachine.products.find((p) => p.slot === slot);
    res.send(new ResponsePayload(product || {}));
  } catch (e: any) {
    throw new BadRequestError(e.message);
  }
};

export const updateCoin = async (req: Request, res: Response) => {
  try {
    const coinValue = parseInt(req.params.coinValue);
    const { quantity } = req.body;
    vendingMachine.updateCoins(coinValue, quantity);
    const coin = vendingMachine.machineVault.find((c) => c.value === coinValue);
    res.send(new ResponsePayload(coin || {}));
  } catch (e: any) {
    throw new BadRequestError(e.message);
  }
};

export const withDrawCoin = async (req: Request, res: Response) => {
  try {
    const coinValue = parseInt(req.params.coinValue);
    const { quantity } = req.body;
    vendingMachine.withdrawFunds(coinValue, quantity);
    const coin = vendingMachine.machineVault.find((c) => c.value === coinValue);
    res.send(new ResponsePayload(coin || {}));
  } catch (e: any) {
    throw new BadRequestError(e.message);
  }
};
