import request from "supertest";
import { app } from "../../app";
import vendingMachine from "../../core/vending-machine";
import { MACHINE_OPERATION_ERRORS } from "../../core/errors-defination";

afterEach(() => {
  vendingMachine.ressetMachine();
});

const depositCoins = async (coins: number[]) => {
  for (let coin of coins) {
    await request(app)
      .post("/users/deposit-coin")
      .send({
        coinValue: coin,
      })
      .expect(200);
  }
};

const depositingAndSelectingSlot = async (coins: number[], slot: number) => {
  // selecting a slot
  await request(app)
    .post("/users/select-slot")
    .send({
      slot,
    })
    .expect(200);

  // depositing funds
  await depositCoins(coins);
};

describe("[USER-ROUTES]", () => {
  it("Should get products successfully", async () => {
    const response = await request(app)
      .get("/users/products")
      .send()
      .expect(200);

    expect(response.body.data).toEqual(vendingMachine.products);
  });

  it("Should select slot successfully", async () => {
    const slot = vendingMachine.slots - 2;
    const response = await request(app)
      .post("/users/select-slot")
      .send({
        slot,
      })
      .expect(200);

    expect(response.body.data.slot).toEqual(slot);
    expect(vendingMachine.selectedSlot).toEqual(slot);
  });

  it("Should not select slot if slot is invalid", async () => {
    const slot = vendingMachine.slots + 2;
    const response = await request(app)
      .post("/users/select-slot")
      .send({
        slot,
      })
      .expect(400);

    expect(response.body.errors[0].message).toEqual(
      MACHINE_OPERATION_ERRORS.INVALID_SLOT
    );
  });
  it("Should not select slot if product is out of stock", async () => {
    const slot = vendingMachine.slots - 2;
    const product = vendingMachine.products.find((p) => p.slot === slot);
    product!.quantity = 0;
    const response = await request(app)
      .post("/users/select-slot")
      .send({
        slot,
      })
      .expect(400);

    expect(response.body.errors[0].message).toEqual(
      MACHINE_OPERATION_ERRORS.PRODUCT_OUT_OF_STOCK
    );
  });

  it("Should be able to enter coins successfully", async () => {
    const validCoins = [5, 25];
    const initFirstCoin = vendingMachine.machineVault.find(
      (c) => c.value === validCoins[0]
    )!.balance;
    const initSecondCoin = vendingMachine.machineVault.find(
      (c) => c.value === validCoins[1]
    )!.balance;

    await depositCoins(validCoins);

    const firstCoin = vendingMachine.machineVault.find(
      (c) => c.value === validCoins[0]
    );
    const secondCoin = vendingMachine.machineVault.find(
      (c) => c.value === validCoins[1]
    );
    expect(firstCoin?.balance).toEqual(initFirstCoin + 1);
    expect(secondCoin?.balance).toEqual(initSecondCoin + 1);
  });

  it("Should not deposit invalid coin when entered", async () => {
    const response = await request(app)
      .post("/users/deposit-coin")
      .send({
        coinValue: 26,
      })
      .expect(400);

    expect(response.body.errors[0].message).toEqual(
      MACHINE_OPERATION_ERRORS.INVALID_COINS
    );
  });

  it("Should be able to confirm purchase after selecting a slot and entering funds and the system is able to compute change", async () => {
    const slot = vendingMachine.slots - 2;
    const coins = [5, 25, 10, 5, 25];

    await depositingAndSelectingSlot(coins, slot);

    // confirming purchase
    await request(app).post("/users/confirm-purchase").send().expect(200);
  });

  it("Should not be able to confirm purchase after selecting a slot and entering funds and the system is unable to compute change", async () => {
    const product = vendingMachine.products[0];
    product.price = 8;
    const slot = product.slot; // making sure we pick this item;

    const coins = [5, 5, 10, 25];

    await depositingAndSelectingSlot(coins, slot);

    // making 1 cent unavailable
    const oneCent = vendingMachine.machineVault.find((c) => c.value === 1);
    oneCent!.balance = 0;

    // confirming purchase
    const response = await request(app)
      .post("/users/confirm-purchase")
      .send()
      .expect(400);
    expect(response.body.errors[0].message).toEqual(
      MACHINE_OPERATION_ERRORS.CANNOT_PROCESS_CHANGE_ERROR
    );
  });
  it("Should not be able to confirm purchase after selecting a slot and entering insufficient funds", async () => {
    const slot = vendingMachine.slots - 2;
    const coins = [1];

    await depositingAndSelectingSlot(coins, slot);

    // confirming purchase
    const response = await request(app)
      .post("/users/confirm-purchase")
      .send()
      .expect(400);
    expect(response.body.errors[0].message).toEqual(
      MACHINE_OPERATION_ERRORS.PURCHASE_INSUFFICIENT_FUNDS
    );
  });

  it("should not make a purchase when trying to purchase without selecting a slot", async () => {
    const response = await request(app)
      .post("/users/confirm-purchase")
      .send()
      .expect(400);
    expect(response.body.errors[0].message).toEqual(
      MACHINE_OPERATION_ERRORS.SLOT_NOT_SELECTED
    );
  });
});
