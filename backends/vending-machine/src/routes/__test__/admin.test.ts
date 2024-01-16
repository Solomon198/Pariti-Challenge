import request from "supertest";
import { app } from "../../app";
import vendingMachine from "../../core/vending-machine";
import { MACHINE_OPERATION_ERRORS } from "../../core/errors-defination";

afterEach(() => {
  vendingMachine.ressetMachine();
});

describe("[ADMIN-ROUTES]", () => {
  it("Should get products successfully", async () => {
    const response = await request(app)
      .get("/admin/products")
      .send()
      .expect(200);
    expect(response.body.data).toEqual(vendingMachine.products);
  });

  it("Should be able to get coins successfully", async () => {
    const response = await request(app).get("/admin/coins").send().expect(200);
    expect(response.body.data).toEqual(vendingMachine.machineVault);
  });

  it("should be able to update product price at a slot", async () => {
    const { slots } = vendingMachine;
    const slot = slots - 1;
    const newPrice = 16;
    const response = await request(app)
      .put(`/admin/products/${slot}`)
      .send({
        price: newPrice,
      })
      .expect(200);
    expect(response.body.data.price).toEqual(newPrice);
  });

  it("should be able to update product available at a slot", async () => {
    const { slots, slotSize } = vendingMachine;
    const slot = slots - 1;
    const newProductQty = slotSize - 1;
    const response = await request(app)
      .put(`/admin/products/${slot}`)
      .send({
        quantity: newProductQty,
      })
      .expect(200);
    expect(response.body.data.quantity).toEqual(newProductQty);
  });

  it("should not be able to update product available at a slot if update is larger than slot size", async () => {
    const { slots, slotSize } = vendingMachine;
    const slot = slots - 1;
    const newProductQty = slotSize + 1;
    const response = await request(app)
      .put(`/admin/products/${slot}`)
      .send({
        quantity: newProductQty,
      })
      .expect(400);
    expect(response.body.errors[0].message).toEqual(
      MACHINE_OPERATION_ERRORS.EXCEEDED_SLOT_SIZE
    );
  });

  it("should not be able to update product available at a slot if slot is invalid", async () => {
    const { slots, slotSize } = vendingMachine;
    const slot = slots + 1;
    const newProductQty = slotSize + 1;
    const response = await request(app)
      .put(`/admin/products/${slot}`)
      .send({
        quantity: newProductQty,
      })
      .expect(400);
    expect(response.body.errors[0].message).toEqual(
      MACHINE_OPERATION_ERRORS.INVALID_SLOT
    );
  });

  it("should be able to  add specific coin quantity", async () => {
    const coinValue = 25;
    const quantity = 30;
    const response = await request(app)
      .put(`/admin/coins/${coinValue}`)
      .send({
        quantity,
      })
      .expect(200);
    expect(response.body.data.balance).toEqual(quantity);
  });

  it("should be able to withdraw specific coin quantity", async () => {
    const coinValue = 25;
    const quantity = 5;
    const coin = vendingMachine.machineVault.find((c) => c.value === coinValue);
    const intialQty = coin!.balance;
    const response = await request(app)
      .put(`/admin/coins/withdraw/${coinValue}`)
      .send({
        quantity,
      })
      .expect(200);
    expect(response.body.data.balance).toEqual(intialQty - quantity);
  });

  it("should not be able to withdraw specific coin quantity if balance is not sufficient", async () => {
    const coinValue = 25;
    const quantity = 15;
    const response = await request(app)
      .put(`/admin/coins/withdraw/${coinValue}`)
      .send({
        quantity,
      })
      .expect(400);
    expect(response.body.errors[0].message).toEqual(
      MACHINE_OPERATION_ERRORS.WITHDRAW_INSUFFICIENT_FUNDS
    );
  });

  it("should not be able to withdraw specific coin quantity if coinValue is invalid", async () => {
    const coinValue = 26;
    const quantity = 15;
    const response = await request(app)
      .put(`/admin/coins/withdraw/${coinValue}`)
      .send({
        quantity,
      })
      .expect(400);
    expect(response.body.errors[0].message).toEqual(
      MACHINE_OPERATION_ERRORS.INVALID_COINS
    );
  });
});
