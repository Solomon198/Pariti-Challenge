import { getAllCurrencyCoins } from "../currency-manager";
import { CurrencyValue } from "../currency-manager/currency";
import CreateProducts, { IProduct } from "../product-manager";

const currencies = getAllCurrencyCoins();

class VendingMachine {
  userDeposit: number = 0;
  machineVault: CurrencyValue[];
  products: IProduct[];
  constructor(
    currency: keyof typeof currencies,
    slots: number,
    public slotSize: number
  ) {
    this.machineVault = currencies[currency].getCurrency();
    this.slotSize = slotSize;
    this.products = new CreateProducts(slots, slotSize).getProducts();
  }

  //utils
  private findProductBySlotNumber(slot: number): IProduct {
    const product = this.products.find((product) => product.slot === slot);
    if (product) {
      return product;
    }
    throw new Error(`No product with slot=${slot} available!`);
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
      foundMoney.balance = updateCoinQty;
      return this.machineVault;
    }
    throw new Error(
      `Current coins does not have support for ${currencyValue}${this.machineVault[0].symbol}`
    );
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
}
