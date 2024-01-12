import { getAllCurrencies } from "../currency-manager";
import { Currency } from "../currency-manager/currency";
import CreateProducts, { IProduct } from "../product-manager";

const currencies = getAllCurrencies();
class VendingMachine {
  machineVault: Currency;
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

  updateCoins(currencyValue: number, updateCoinQty: number): Currency {
    const { coins, notes } = this.machineVault;
    const foundMoney = [...notes, ...coins].find(
      (currency) => currency.value === currencyValue
    );
    if (foundMoney) {
      foundMoney.balance = updateCoinQty;
      return this.machineVault;
    }
    throw new Error(
      `Current currency does not have support for ${currencyValue} ${coins[0].name} or ${notes[0].name}`
    );
  }

  withdrawFunds(currencyValue: number, quantity: number): Currency {
    const { coins, notes } = this.machineVault;
    const foundMoney = [...notes, ...coins].find(
      (currency) => currency.value === currencyValue
    );
    if (foundMoney) {
      foundMoney.balance = foundMoney.balance - quantity;
      return this.machineVault;
    }
    throw new Error(
      `Current currency does not have support for ${currencyValue} ${coins[0].name} or ${notes[0].name}`
    );
  }
}