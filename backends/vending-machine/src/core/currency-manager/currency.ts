import { CurrencyValue } from "@vending/utils";

export class CreateCurrency {
  constructor(private coins: CurrencyValue[]) {
    // copying config values to avoid mutation from other part of code
    this.coins = coins.map((coin) => ({ ...coin }));
  }

  getCurrency(): CurrencyValue[] {
    return this.coins;
  }
}
