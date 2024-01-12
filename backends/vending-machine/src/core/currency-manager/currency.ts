export interface CurrencyValue {
  name: string;
  value: number;
  symbol: string;
  balance: number;
}

export interface Currency {
  currencyName: string;
  coins: CurrencyValue[];
  notes: CurrencyValue[];
}
export class CreateCurrency {
  private currencyName: string;
  constructor(private notes: CurrencyValue[], private coins: CurrencyValue[]) {
    this.addCoins(coins);
    this.addCurrencyNotes(notes);
    this.currencyName = coins[0].name;
  }

  addCoins(coins: CurrencyValue[]): void {
    coins.forEach((coin) => {
      this.coins.push(coin);
    });
  }

  addCurrencyNotes(notes: CurrencyValue[]): void {
    notes.forEach((note) => {
      this.notes.push(note);
    });
  }

  getCurrency(): Currency {
    return {
      coins: this.coins,
      notes: this.notes,
      currencyName: this.currencyName,
    };
  }
}
