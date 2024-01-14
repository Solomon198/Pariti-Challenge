import vendingMachine from "../vending-machine";
import { getAllCurrencyCoins } from "../currency-manager";
import env from "../../env/env";

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
      expect(e.message).toEqual("Unsupported type of coin");
      return;
    }
    throw "Unexpected test outcome - suppose to throw error for unsupported coin value";
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
      expect(e.message).toEqual("Invalid slot!. please enter a valid slot");
      return;
    }
    throw new Error("Should throw error since slot is invalid");
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
      expect(e.message).toEqual(
        "You can't add more product than this machine can accomodate"
      );
      return;
    }
    throw new Error(
      "Should throw error when we insert more product than a slot can accomodate"
    );
  });

  it("Should throw an error when trying to add to slot not available", () => {
    const slot = vendingMachine.slots + 1;
    const newQty = vendingMachine.slotSize; // refilling
    try {
      vendingMachine.adjustAvailableProduct(slot, newQty);
    } catch (e: any) {
      expect(e.message).toEqual("Invalid slot!. please enter a valid slot");
      return;
    }
    throw new Error(
      "Should throw error when we try to access a slot not valid"
    );
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
      expect(e.message).toEqual("Invalid coins does not exist!");
      return;
    }
    throw new Error(
      "Should throw error when we try to access an invalid coins"
    );
  });

  it("Should throw an error when trying to withdraw with insufficient funds", () => {
    const coinToWithdraw = 25; // i.e 25 cents for dollar
    const quantity = 55; // number of coin to be taken
    try {
      vendingMachine.withdrawFunds(coinToWithdraw, quantity);
    } catch (e: any) {
      expect(e.message).toEqual("Insufficient funds");
      return;
    }
    throw new Error(
      "Should throw error when we try to withdraw with insufficient coins"
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
      expect(e.message).toEqual("Invalid slot!. please enter a valid slot");
      return;
    }
    throw new Error("Should throw an error when an invalid slot is entered");
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
      expect(e.message).toEqual("Invalid coins does not exist!");
      return;
    }
    throw new Error("should throw new error if invalid coin is entered");
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

  it("should throw an error when trying to make a purchase without selecting a slot ", () => {
    try {
      vendingMachine.confirmPurchase();
    } catch (e: any) {
      expect(e.message).toEqual("Please select a slot");
      return;
    }
    throw new Error("Should throw error when no slot is selected");
  });

  it("Should throw error when trying to make purchases with insufficient funds", () => {
    try {
      initiateUserPurchase([1], vendingMachine.slots - 1);
      vendingMachine.confirmPurchase();
    } catch (e: any) {
      expect(e.message).toEqual("Insufficient funds to purchase product");
      return;
    }
    throw new Error(
      "Should throw error when trying to buy an item with insufficient"
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
