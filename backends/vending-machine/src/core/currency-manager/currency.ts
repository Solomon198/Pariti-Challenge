export interface CurrencyValue {
  name: string;
  value: number;
  symbol: string;
  balance: number;
}

export class CreateCurrency {
  constructor(private coins: CurrencyValue[]) {
    this.addCoins(coins);
  }

  addCoins(coins: CurrencyValue[]): void {
    coins.forEach((coin) => {
      this.coins.push(coin);
    });
  }

  getCurrency(): CurrencyValue[] {
    return this.coins;
  }
}
