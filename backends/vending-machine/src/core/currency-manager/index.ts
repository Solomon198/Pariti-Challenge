import { CreateCurrency } from "./currency";
import currencyConfigs from "./currency-configs";

export function getAllCurrencies() {
  const { Dollar, Euro } = currencyConfigs;
  return {
    dollar: new CreateCurrency(Dollar.notesConfig, Dollar.coinsConfig),
    euro: new CreateCurrency(Euro.notesConfig, Euro.coinsConfig),
  };
}
