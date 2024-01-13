import vendingMachine from "../vending-machine";
import { getAllCurrencyCoins } from "../currency-manager";
import env from "../../env/env";

const coinTypes = getAllCurrencyCoins();

afterEach(() => {
  vendingMachine.ressetMachine();
});

it("Should ensure vending machine vault is configured according to configured currency coins", () => {
  expect(vendingMachine.machineVault).toEqual(
    coinTypes[env.COINS_CURRENCY].getCurrency()
  );
});

describe("[ADMIN-ACTION]- Updating specific coins", () => {
  it("Should be able to update a specific coin in machine valut", () => {
    const coinValueToCollect = 25;
    const quantityAdded = 20;
    let coins = vendingMachine.machineVault.find(
      (v) => v.value === coinValueToCollect
    );
    const initialCoinsQty = coins!.balance;
    vendingMachine.updateCoins(coinValueToCollect, quantityAdded);
    expect(coins!.balance).toEqual(initialCoinsQty + quantityAdded);
  });

  it("should throw an error if coin value is not a valid coin in vault", () => {
    const coinValueToCollect = 20;
    const quantityAdded = 20;
    try {
      vendingMachine.updateCoins(coinValueToCollect, quantityAdded);
    } catch (e: any) {
      expect(e.message).toEqual("Unsupported type of coin");
      return;
    }
    throw "Unexpected test outcome - suppose to throw error for unsupported coin value";
  });
});

describe("[ADMIN-ACTION]-Updating product size", () => {
  it("should be able to update product size", () => {
    // the last machine slot
    const productSlot = vendingMachine.slots;
    const newPrice = 30;
    const product = vendingMachine.products.find(
      (product) => product.slot === productSlot
    );
    vendingMachine.setProductPrize(productSlot, newPrice);
    expect(product!.price).toEqual(newPrice);
  });

  it("should throw an error when product slot is not available", () => {
    const productSlot = vendingMachine.slots + 1; // this goes beyond slot range
    const newPrice = 30;
    try {
      vendingMachine.setProductPrize(productSlot, newPrice);
    } catch (e: any) {
      expect(e.message).toEqual("Invalid slot!. please enter a valid slot");
      return;
    }
    throw new Error("Should throw error since slot is invalid");
  });
});
