import vendingMachine from "../vending-machine";
import { getAllCurrencyCoins } from "../currency-manager";
import env from "../../env/env";
import { MACHINE_OPERATION_ERRORS } from "../errors-defination";

const coinTypes = getAllCurrencyCoins();

const initiateUserPurchase = (moneyToInsert: number[], slot: number) => {
  // entering coins
  const coinsToInsert = moneyToInsert;
  coinsToInsert.forEach((v) => {
    vendingMachine.depositFunds(v);
  });

  //selecting slot
  vendingMachine.selectSlot(slot);
};

afterEach(() => {
  vendingMachine.ressetMachine();
});

it("Should ensure vending machine vault is configured according to configured currency coins", () => {
  expect(vendingMachine.machineVault).toEqual(
    coinTypes[env.COINS_CURRENCY].getCurrency()
  );
});

describe("[ADMIN-ACTION]- Updating specific coin quantity or available in machine", () => {
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
      expect(e.message).toEqual(MACHINE_OPERATION_ERRORS.INVALID_COINS);
      return;
    }
    throw "Unexpected test error for testing invalid coin";
  });
});

describe("[ADMIN-ACTION]-Updating product price", () => {
  it("should be able to update product price", () => {
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
      expect(e.message).toEqual(MACHINE_OPERATION_ERRORS.INVALID_SLOT);
      return;
    }
    throw new Error("Unexpected test error for testing invalid slot");
  });
});

describe("[ADMIN-ACTION]- update available products at a slot", () => {
  it("Should be able to update available product quantity", () => {
    const slot = vendingMachine.slots - 1;
    const newQty = vendingMachine.slotSize; // refilling
    const product = vendingMachine.products.find(
      (product) => product.slot === slot
    );
    vendingMachine.adjustAvailableProduct(slot, newQty);
    expect(product!.quantity).toEqual(newQty);
  });

  it("Should throw an error when trying to overload a slot", () => {
    const slot = vendingMachine.slots - 1;
    const newQty = vendingMachine.slotSize + 1; // refilling
    try {
      vendingMachine.adjustAvailableProduct(slot, newQty);
    } catch (e: any) {
      expect(e.message).toEqual(MACHINE_OPERATION_ERRORS.EXCEEDED_SLOT_SIZE);
      return;
    }
    throw new Error("Unexpected test error for testing exceeding slot size");
  });

  it("Should throw an error when trying to add to slot not available", () => {
    const slot = vendingMachine.slots + 1;
    const newQty = vendingMachine.slotSize; // refilling
    try {
      vendingMachine.adjustAvailableProduct(slot, newQty);
    } catch (e: any) {
      expect(e.message).toEqual(MACHINE_OPERATION_ERRORS.INVALID_SLOT);
      return;
    }
    throw new Error("Unexpected test error for testing invalid slot");
  });
});

describe("[ADMIN-ACTION]- admin should be able to withdraw from machine", () => {
  it("should be able to withdraw a specific coin", () => {
    const coinToWithdraw = 25; // i.e 25 cents for dollar
    const quantity = 5; // number of coin to be taken
    const coins = vendingMachine.machineVault.find(
      (coin) => coin.value === coinToWithdraw
    );
    const initialQty = coins!.balance;
    vendingMachine.withdrawFunds(coinToWithdraw, quantity);
    expect(coins!.balance).toEqual(initialQty - quantity);
  });

  it("Should throw an error when trying to withdraw an invalid coin", () => {
    const coinToWithdraw = 55; // i.e 25 cents for dollar
    const quantity = 5; // number of coin to be taken
    try {
      vendingMachine.withdrawFunds(coinToWithdraw, quantity);
    } catch (e: any) {
      expect(e.message).toEqual(MACHINE_OPERATION_ERRORS.INVALID_COINS);
      return;
    }
    throw new Error("Unexpected test error for testing invalid coin");
  });

  it("Should throw an error when trying to withdraw with insufficient funds", () => {
    const coinToWithdraw = 25; // i.e 25 cents for dollar
    const quantity = 55; // number of coin to be taken
    try {
      vendingMachine.withdrawFunds(coinToWithdraw, quantity);
    } catch (e: any) {
      expect(e.message).toEqual(
        MACHINE_OPERATION_ERRORS.WITHDRAW_INSUFFICIENT_FUNDS
      );
      return;
    }
    throw new Error(
      "Unexpected test error for testing withdrawing with insufficient funds"
    );
  });
});

// USER ACTIONS
describe("[USER-ACTIONS] selecting a slot", () => {
  it("should be able to select slot successfully", () => {
    const slot = vendingMachine.slots; // last slot
    const productSlot = vendingMachine.selectSlot(slot);
    expect(productSlot.slot).toEqual(slot);
  });

  it("Should throw error when slot is invalid", () => {
    const slot = vendingMachine.slots + 1;
    try {
      vendingMachine.selectSlot(slot);
    } catch (e: any) {
      expect(e.message).toEqual(MACHINE_OPERATION_ERRORS.INVALID_SLOT);
      return;
    }
    throw new Error("Unexpected test error for testing invalid slot");
  });
});

describe("[USER-ACTIONS] depositing fund or funding machine", () => {
  it("should be able to fund machine successfully", () => {
    const coinValue = 25;
    const coin = vendingMachine.machineVault.find((c) => c.value === coinValue);
    const initialQty = coin!.balance;
    vendingMachine.depositFunds(coinValue);
    expect(coin!.balance).toEqual(initialQty + 1);
  });

  it("Should throw error when coin value is invalid", () => {
    const coinValue = 26;
    try {
      vendingMachine.depositFunds(coinValue);
    } catch (e: any) {
      expect(e.message).toEqual(MACHINE_OPERATION_ERRORS.INVALID_COINS);
      return;
    }
    throw new Error("Unexpected test error for testing invalid coins");
  });
});

describe("[USER-ACTIONS] purchasing item in machine", () => {
  it("should be able to select slot fund machine and buy item successfully", () => {
    const slot = vendingMachine.slots - 1;
    const product = vendingMachine.products.find((p) => p.slot === slot);
    const productQtyBeforePurchase = product!.quantity;
    initiateUserPurchase([25, 5, 10, 5, 25, 25], slot);
    vendingMachine.confirmPurchase();
    vendingMachine.products.find((p) => p.slot === slot);
    expect(product!.quantity).toEqual(productQtyBeforePurchase - 1);
  });

  it("should be able to select slot fund machine and not buy item when change cannot be processed", () => {
    const slot = vendingMachine.slots - 1;
    initiateUserPurchase([1, 5, 10, 5, 25, 25], slot);
    try {
      // intentionally make 1 cent unavailable
      vendingMachine.machineVault[0].balance = 0;
      vendingMachine.confirmPurchase();
    } catch (e: any) {
      expect(e.message).toEqual(
        MACHINE_OPERATION_ERRORS.CANNOT_PROCESS_CHANGE_ERROR
      );
      return;
    }
    throw new Error(
      "Unexpected test error for testing inablility to process change"
    );
  });

  it("should not be able to purchase item when out of stock", () => {
    const slot = vendingMachine.slots - 1;
    const productIndex = vendingMachine.products.findIndex(
      (p) => p.slot === slot
    );
    // intentionally making product unavailable
    vendingMachine.products[productIndex].quantity = 0;
    try {
      initiateUserPurchase([1, 5, 10, 5, 25, 25], slot);
      vendingMachine.confirmPurchase();
    } catch (e: any) {
      expect(e.message).toEqual(MACHINE_OPERATION_ERRORS.PRODUCT_OUT_OF_STOCK);
      return;
    }
    throw new Error("Unexpected test error for testing out of stock logic");
  });

  it("should throw an error when trying to make a purchase without selecting a slot ", () => {
    try {
      vendingMachine.confirmPurchase();
    } catch (e: any) {
      expect(e.message).toEqual(MACHINE_OPERATION_ERRORS.SLOT_NOT_SELECTED);
      return;
    }
    throw new Error("Unexpected test error for testing slot not selected");
  });

  it("Should throw error when trying to make purchases with insufficient funds", () => {
    try {
      initiateUserPurchase([1], vendingMachine.slots - 1);
      vendingMachine.confirmPurchase();
    } catch (e: any) {
      expect(e.message).toEqual(
        MACHINE_OPERATION_ERRORS.PURCHASE_INSUFFICIENT_FUNDS
      );
      return;
    }
    throw new Error(
      "Unexpected test error for testing unable to take money from a coin compactment"
    );
  });

  it("Should all coins as entered when user aborts transaction", () => {
    const insertValue = [25, 10, 5];
    initiateUserPurchase(insertValue, vendingMachine.slots - 1);
    const usersDeposit = vendingMachine.cancelPurchase();
    const arrValue = usersDeposit.map((v) => v.value);
    expect(insertValue).toEqual(arrValue);
  });

  it("Should return empty array when trying to cancel purchase without deposit", () => {
    const userDeposit = vendingMachine.cancelPurchase();
    expect(userDeposit).toEqual([]);
  });
});
