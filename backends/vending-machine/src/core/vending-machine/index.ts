import env from "../../env/env";
import { getAllCurrencyCoins } from "../currency-manager";
import {
  CurrencyValue,
  IProduct,
  TCurrencyValue,
  TProduct,
} from "@vending/utils";
import { MACHINE_OPERATION_ERRORS } from "../errors-defination";
import CreateProducts from "../product-manager";

import _ from "lodash";

const currencies = getAllCurrencyCoins();

class VendingMachine {
  userDeposit: number = 0;
  selectedSlot: number | null = null;
  machineVault: CurrencyValue[];
  products: IProduct[];
  constructor(
    public currency: keyof typeof currencies,
    public slots: number,
    public slotSize: number
  ) {
    this.machineVault = currencies[currency].getCurrency();
    this.machineVault.sort((a, b) => (a.value > b.value ? 1 : -1));
    this.slotSize = slotSize;
    this.products = new CreateProducts(
      slots,
      slotSize,
      this.machineVault[0].symbol
    ).getProducts();
  }

  //utils
  private findProductBySlotNumber(slot: number): IProduct {
    const product = this.products.find((product) => product.slot === slot);
    if (product) {
      return product;
    }
    throw new Error(MACHINE_OPERATION_ERRORS.INVALID_SLOT);
  }

  private findCurrencyByValue(currencyValue: number): CurrencyValue {
    const foundMoney = this.machineVault.find(
      (currency) => currency.value === currencyValue
    );
    if (foundMoney) {
      return foundMoney;
    }
    throw new Error(MACHINE_OPERATION_ERRORS.INVALID_COINS);
  }

  //Admin operations
  setProductPrize(slot: number, newPrice: number): IProduct {
    const product = this.findProductBySlotNumber(slot);
    product.price = newPrice;
    return product;
  }

  adjustAvailableProduct(slot: number, availableQty: number): IProduct {
    const product = this.findProductBySlotNumber(slot);
    if (availableQty <= this.slotSize) {
      product.quantity = availableQty;
      return product;
    }
    throw new Error(MACHINE_OPERATION_ERRORS.EXCEEDED_SLOT_SIZE);
  }

  updateCoins(currencyValue: number, updateCoinQty: number): CurrencyValue[] {
    const foundMoney = this.findCurrencyByValue(currencyValue);
    if (foundMoney) {
      foundMoney.balance = updateCoinQty;
      return this.machineVault;
    }
    throw new Error("Unexpected error updating coins");
  }

  withdrawFunds(coinValue: number, quantity: number): CurrencyValue[] {
    const foundMoney = this.findCurrencyByValue(coinValue);
    if (foundMoney) {
      if (foundMoney.balance < quantity)
        throw new Error(MACHINE_OPERATION_ERRORS.WITHDRAW_INSUFFICIENT_FUNDS);
      foundMoney.balance = foundMoney.balance - quantity;
      return Array(quantity).map((_) => ({ ...foundMoney }));
    }
    throw new Error("Unexpected errror withdrawing funds");
  }

  // USER ACTIONS

  selectSlot(slot: number): IProduct {
    const product = this.findProductBySlotNumber(slot);
    if (product) {
      if (product.quantity === 0)
        throw new Error(MACHINE_OPERATION_ERRORS.PRODUCT_OUT_OF_STOCK);
      this.selectedSlot = slot;
      return product;
    }
    throw new Error("Unexpected error selecting slot");
  }

  depositFunds(coinValue: number): CurrencyValue {
    const foundMoney = this.findCurrencyByValue(coinValue);
    if (foundMoney) {
      this.userDeposit += coinValue;
      foundMoney.balance += 1;
      return foundMoney;
    }
    throw new Error("Unexpected error depositing funds");
  }

  getUserChange(change: number): Array<TCurrencyValue> {
    if (change === 0) {
      this.selectedSlot = null;
      this.userDeposit = 0;
      return [];
    }
    const userChange: CurrencyValue[] = [];
    const copiedVault = this.machineVault.map((coin) => ({
      ...coin,
    }));
    while (change > 0) {
      for (let i = this.machineVault.length - 1; i >= 0; i--) {
        if (copiedVault[i].value > change) continue;
        if (copiedVault[i].balance === 0)
          throw new Error(MACHINE_OPERATION_ERRORS.CANNOT_PROCESS_CHANGE_ERROR);
        copiedVault[i].balance -= 1;
        change -= copiedVault[i].value;
        userChange.push(copiedVault[i]);
        if (change === 0) {
          this.machineVault = copiedVault;
          this.userDeposit = 0;
          this.selectedSlot = null;
          return userChange.map((change) => _.omit(change, "balance"));
        }
        break;
      }
    }
    throw new Error("Unexpected error checking for change");
  }

  confirmPurchase(): Array<TCurrencyValue> {
    if (!this.selectedSlot)
      throw new Error(MACHINE_OPERATION_ERRORS.SLOT_NOT_SELECTED);
    const product = this.findProductBySlotNumber(this.selectedSlot);
    if (this.userDeposit < product!.price) {
      throw new Error(MACHINE_OPERATION_ERRORS.PURCHASE_INSUFFICIENT_FUNDS);
    }
    const change = this.userDeposit - product!.price;
    const userChange = this.getUserChange(change);
    product!.quantity -= 1;
    return userChange;
  }

  cancelPurchase(): Array<TCurrencyValue> {
    return this.getUserChange(this.userDeposit);
  }

  ressetMachine() {
    this.userDeposit = 0;
    this.machineVault = getAllCurrencyCoins()[this.currency].getCurrency();
    this.products = new CreateProducts(
      this.slots,
      this.slotSize,
      this.machineVault[0].symbol
    ).getProducts();
    this.selectedSlot = null;
  }
}
const { SLOTS, SLOT_SIZE, COINS_CURRENCY } = env;
export default new VendingMachine(COINS_CURRENCY, SLOTS, SLOT_SIZE);
