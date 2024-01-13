import env from "../../env/env";
import { getAllCurrencyCoins } from "../currency-manager";
import { CurrencyValue } from "../currency-manager/currency";
import CreateProducts, { IProduct } from "../product-manager";

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
    this.products = new CreateProducts(slots, slotSize).getProducts();
  }

  //utils
  private findProductBySlotNumber(slot: number): IProduct {
    const product = this.products.find((product) => product.slot === slot);
    if (product) {
      return product;
    }
    throw new Error(`Invalid slot!. please enter a valid slot`);
  }

  private findCurrencyByValue(currencyValue: number): CurrencyValue {
    const foundMoney = this.machineVault.find(
      (currency) => currency.value === currencyValue
    );
    if (foundMoney) {
      return foundMoney;
    }
    throw new Error("Invalid coins does not exist!");
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
    }
    throw new Error(
      `You can't add more product than this machine can accomodate`
    );
  }

  updateCoins(currencyValue: number, updateCoinQty: number): CurrencyValue[] {
    const foundMoney = this.machineVault.find(
      (currency) => currency.value === currencyValue
    );
    if (foundMoney) {
      foundMoney.balance += updateCoinQty;
      return this.machineVault;
    }
    throw new Error("Unsupported type of coin");
  }

  withdrawFunds(coinValue: number, quantity: number): CurrencyValue[] {
    const foundMoney = this.findCurrencyByValue(coinValue);
    if (foundMoney) {
      foundMoney.balance = foundMoney.balance - quantity;
      return this.machineVault;
    }
    throw new Error(
      `Coins does not have support for ${coinValue} ${this.machineVault[0].symbol}`
    );
  }

  // USER ACTIONS

  selectSlot(slot: number): number {
    const product = this.products.find((product) => product.slot === slot);
    if (product) {
      if (product.quantity === 0) throw new Error("Product out of stock!");
      this.selectedSlot = slot;
      return slot;
    }
    throw new Error("Please enter a valid slot");
  }

  depositFunds(coinValue: number) {
    const foundMoney = this.findCurrencyByValue(coinValue);
    if (foundMoney) {
      this.userDeposit += coinValue;
      foundMoney.balance += 1;
    }
    throw new Error(`Could not find coins ${this.machineVault[0].symbol}`);
  }

  getUserChange(change: number): CurrencyValue[] {
    const userChange: CurrencyValue[] = [];
    const copiedVault = this.machineVault.map((coin) => ({
      ...coin,
    }));
    while (change !== 0) {
      for (let i = this.machineVault.length - 1; i >= 0; i--) {
        if (copiedVault[i].value > change) continue;
        copiedVault[i].balance -= 1;
        change -= change - copiedVault[i].value;
        userChange.push(copiedVault[i]);
        if (change === 0) {
          this.machineVault = copiedVault;
          return userChange;
        }
      }
    }
    throw new Error(
      "Transaction cannot be completed as system does not have change"
    );
  }

  confirmPurchase(): CurrencyValue[] {
    if (!this.selectedSlot) throw new Error("Please select a slot");
    const product = this.products.find(
      (product) => product.slot === this.selectedSlot
    );
    if (this.userDeposit < product!.price) {
      throw new Error(`Insufficient funds to purchase ${product?.name} `);
    }
    const change = this.userDeposit - product!.price;
    const userChange = this.getUserChange(change);
    product!.quantity -= 1;
    return userChange;
  }

  ressetMachine() {
    this.userDeposit = 0;
    this.machineVault = getAllCurrencyCoins()[this.currency].getCurrency();
    this.products = new CreateProducts(this.slots, this.slotSize).getProducts();
    this.selectedSlot = null;
  }
}
const { SLOTS, SLOT_SIZE, COINS_CURRENCY } = env;
export default new VendingMachine(COINS_CURRENCY, SLOTS, SLOT_SIZE);
