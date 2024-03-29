import { faker } from "@faker-js/faker";
import _ from "lodash";
import { productPrizes } from "./product-configs";
import { IProduct } from "@vending/utils";

export default class CreateProducts {
  private products: IProduct[];
  constructor(
    public slots: number,
    public slotSize: number,
    currencySymbol: string
  ) {
    this.slotSize = slotSize;
    this.slots = slots;
    this.products = this.createProducts(currencySymbol);
  }

  createProducts(currencySymbol: string): IProduct[] {
    const createdSlots = Array(this.slots)
      .fill("")
      .map((_, index) => index + 1);

    const products = createdSlots.map((slot) => {
      let product: IProduct = {
        name: faker.commerce.product(),
        price: _.sample(productPrizes) as number,
        slot,
        quantity: this.slotSize,
        currencySymbol,
      };
      return product;
    });

    return products;
  }

  getProducts(): IProduct[] {
    return this.products;
  }
}
