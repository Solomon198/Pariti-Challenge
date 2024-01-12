import { faker } from "@faker-js/faker";
import _ from "lodash";
import { productPrizes } from "./product-configs";

export interface IProduct {
  name: string;
  price: number;
  slot: number;
  quantity: number;
}

export default class CreateProducts {
  private products: IProduct[];
  constructor(public slots: number, public slotSize: number) {
    this.slotSize = slotSize;
    this.slots = slots;
    this.products = this.createProducts();
  }

  createProducts(): IProduct[] {
    const createdSlots = Array(this.slots)
      .fill("")
      .map((_, index) => index + 1);

    const products = createdSlots.map((slot) => {
      let product: IProduct = {
        name: faker.commerce.product(),
        price: _.sample(productPrizes) as number,
        slot,
        quantity: this.slotSize,
      };
      return product;
    });

    return products;
  }

  getProducts(): IProduct[] {
    return this.products;
  }
}
