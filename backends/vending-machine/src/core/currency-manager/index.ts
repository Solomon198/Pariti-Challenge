import { CreateCurrency } from "./currency";
import currencyConfigs from "./currency-configs";

export function getAllCurrencyCoins() {
  const { Dollar, Euro } = currencyConfigs;
  return {
    dollar: new CreateCurrency(Dollar.coinsConfig),
    euro: new CreateCurrency(Euro.coinsConfig),
  };
}
