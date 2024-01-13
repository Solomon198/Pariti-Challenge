export interface CurrencyValue {
  name: string;
  value: number;
  symbol: string;
  balance: number;
}

export class CreateCurrency {
  constructor(private coins: CurrencyValue[]) {
    // copying config values to avoid mutation from other part of code
    this.coins = coins.map((coin) => ({ ...coin }));
  }

  getCurrency(): CurrencyValue[] {
    return this.coins;
  }
}
